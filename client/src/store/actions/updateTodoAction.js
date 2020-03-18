import { UPDATE_TODO } from '../../constants/actionTypes';
import { createAction } from 'redux-actions';
import { apiPutFormData } from '../../api/Api';
import { urlToDos } from '../../api/urls';

export const updateTodo = createAction(
    UPDATE_TODO,
    (id, todo) => apiPutFormData(urlToDos, id, todo)
);