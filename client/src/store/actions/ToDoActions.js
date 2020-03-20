import { FETCH_TODOS, INSERT_TODO, UPDATE_TODO, DELETE_TODO, CHANGE_TODO_PROPS } from '../../constants/actionTypes';
import { createAction } from 'redux-actions';
import { apiGet, apiPostFormData, apiPutFormData, apiDelete } from '../../api/Api';
import { urlToDos } from '../../api/urls';

export const fetchTodos = createAction(
    FETCH_TODOS,
    (params) => apiGet(`${urlToDos}${params}`)
);

export const insertTodo = createAction(
    INSERT_TODO,
    (todo) => apiPostFormData(urlToDos, todo)
);

export const updateTodo = createAction(
    UPDATE_TODO,
    (id, todo) => apiPutFormData(urlToDos, id, todo)
);

export const deleteTodo = createAction(
    DELETE_TODO,
    id => apiDelete(urlToDos, id)
);

export const changeTodoProps = createAction(
    CHANGE_TODO_PROPS,
    (props) => props
);