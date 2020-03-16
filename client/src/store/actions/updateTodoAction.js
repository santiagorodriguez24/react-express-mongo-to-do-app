import { UPDATE_TODO } from '../../constants/constants';
import { createAction } from 'redux-actions';
import { apiPut } from '../../api/Api';
import { urlToDos } from '../../api/urls';

export const updateTodo = createAction(
    UPDATE_TODO,
    (id, todo) => apiPut(urlToDos, id, todo)
);