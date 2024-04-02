import React, { useEffect } from 'react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import store from './redux/store';
import { FaListCheck } from "react-icons/fa6";

function App() {
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      store.dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(storedTasks) });
    }
  }, []); // Ensure to provide an empty dependency array for useEffect

  return (
    <Provider store={store}>
      {/* Wrap your components with <Provider> */}
      <div className="App">
        <h1><p>To-Do List </p><FaListCheck/></h1>
        <TaskInput />
        <TaskList />
      </div>
    </Provider>
  );
}

export default App;
