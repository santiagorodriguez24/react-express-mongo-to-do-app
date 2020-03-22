import { handleActions } from 'redux-actions';
import { FETCH_TODOS, INSERT_TODO, UPDATE_TODO, DELETE_TODO, CHANGE_TODO_PROPS } from '../../constants/actionTypes';

export const todos = handleActions(
    {
        [CHANGE_TODO_PROPS]: (state, action) => {
            return Object.assign({}, state, action.payload)
        },

        [FETCH_TODOS]: (state, action) => {

            if (action.error) {
                return ({
                    todos: [...state.todos],
                    error: action.payload.error
                });
            }

            return ({
                todos: [...action.payload.todos],
                error: ''
            });
        },

        [INSERT_TODO]: (state, action) => {

            if (action.error) {
                return ({
                    todos: [...state.todos],
                    error: action.payload.error
                });
            }

            return ({
                todos: [...state.todos, action.payload.todo],
                error: ''
            });
        },

        [UPDATE_TODO]: (state, action) => {

            if (action.error) {
                return ({
                    todos: [...state.todos],
                    error: action.payload.error
                });
            }

            const todos = state.todos;
            const editedTodo = action.payload.todo;
            const { id } = editedTodo;

            let newTodos = todos.reduce(
                (acumulador, todo) => {
                    if (todo.id === id) {
                        return [...acumulador, editedTodo];
                    } else {
                        return [...acumulador, todo]
                    }
                },
                []
            );

            return ({
                todos: newTodos,
                error: ''
            });
        },

        [DELETE_TODO]: (state, action) => {
            
            if (action.error) {
                return ({
                    todos: [...state.todos],
                    error: action.payload.error
                });
            }

            let newTodos = state.todos.filter(todo => todo.id !== action.payload.todo.id);

            return ({
                todos: newTodos,
                error: ''
            });
        }

    },
    {
        todos: [],
        error: ''
    }
);