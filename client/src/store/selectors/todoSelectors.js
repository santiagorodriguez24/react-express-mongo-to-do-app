import { createSelector } from 'reselect';

export const getTodos = state => state.todos.todos;

export const getError = state => state.todos.error;

export const getTodoById = createSelector(
    (state, props) => state.todos.todos.find(todo => todo.id.toString() === props.id),
    todo => todo
);

export const getTodosByState = createSelector(
    (state, toDoState) => state.todos.todos.filter(todo => todo.state === toDoState),
    todos => todos
);