import React, { useEffect, useState }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTask, editTask } from '../redux/actions';
import { MdDeleteForever, MdOutlineModeEditOutline, MdDone } from "react-icons/md";

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState(null);
  const [filter, setFilter] = useState('all'); // Initialize filter state

  console.log("tasks--------", tasks);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'notCompleted') return !task.completed;
    return true;
  });

  console.log("filtered---", filteredTasks);
  
  const handleToggle = (taskId) => {
    dispatch(toggleTask(taskId));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEdit = (taskId, taskTitle) => {
    setEditTaskId(taskId);
    setEditTaskTitle(taskTitle);
  };

  const handleSaveEdit = (taskId) => {
    // Dispatch action to update task title
    dispatch(editTask(taskId, editTaskTitle));
    setEditTaskTitle(null)
    setEditTaskId(null);
  };

  return (
    <div className='task-list'>
      <div className='filters'>
        Filter:
        <input type="radio" id="all" name="filter" value="all" checked={filter === 'all'} onChange={(e) => setFilter(e.target.value)}/>
        <label htmlFor="all">All</label>

        <input type="radio" id="completed" name="filter" value="completed" checked={filter === 'completed'} onChange={(e) => setFilter(e.target.value)} />
        <label htmlFor="completed">Completed</label>

        <input type="radio" id="notCompleted" name="filter" value="notCompleted" checked={filter === 'notCompleted'} onChange={(e) => setFilter(e.target.value)}/>
        <label htmlFor="notCompleted">Pending</label>
      </div>
      <div className='list-items'>
        {filter === 'completed' && filteredTasks.length === 0 && (
          <p>All tasks are pending.</p>
        )}

        {filter === 'notCompleted' && filteredTasks.length === 0 && (
          <p>All done! Great work!</p>
        )}
        {filteredTasks.length !== 0 && (
          <ul>
            {filteredTasks.map(task => (
              <li key={task.id}>
                {editTaskId === task.id ? (
                  <div className='edit-task'>
                    <form>
                      <div className='inside-form'>
                        <input type="text" value={editTaskTitle} onChange={(e) => setEditTaskTitle(e.target.value)} />
                        <MdDone type='submit' onClick={() => handleSaveEdit(task.id)}/>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className='task'>
                    <input id={`task-check-${task.id}`} type="checkbox" checked={task.completed} onChange={() => handleToggle(task.id)} />
                    <label htmlFor={`task-check-${task.id}`} >{task.title}</label>
                    <MdOutlineModeEditOutline className='edit-icon' onClick={() => handleEdit(task.id, task.title)}/>
                    <MdDeleteForever className='delete-icon' onClick={() => handleDelete(task.id)}/>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
