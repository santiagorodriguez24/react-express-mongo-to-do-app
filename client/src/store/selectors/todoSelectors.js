import { createSelector } from 'reselect';

export const getTodos = state => state.todos;

export const getTodoById = createSelector(
    (state, props) => state.todos.find(todo => todo._id === props.id),
    todo => todo
);

export const getTodosByState = createSelector(
    (state, toDoState) => state.todos.filter(todo => todo.state === toDoState),
    todos => todos
);