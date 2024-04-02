import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';
import { IoIosAdd } from "react-icons/io";

const TaskInput = () => {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === '') return;
    dispatch(addTask({ id: Date.now(), title: task }));
    setTask('');
  };

  return (
    <div className='add-task'>
        <form onSubmit={handleSubmit}>
          <div className='inside-form'>
            <input type="text" value={task} onChange={handleChange} placeholder="What would you like to do ?" />
            <IoIosAdd type="submit"/>
          </div>
        </form>
    </div>
  );
};

export default TaskInput;
