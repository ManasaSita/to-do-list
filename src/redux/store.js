import { createStore } from 'redux';
import reducer, { initialState } from './reducers';

const store = createStore(
    reducer,
    JSON.parse(localStorage.getItem('tasks')) || initialState
);
  
store.subscribe(() => {
    localStorage.setItem('tasks', JSON.stringify(store.getState()));
});
  
export default store;
