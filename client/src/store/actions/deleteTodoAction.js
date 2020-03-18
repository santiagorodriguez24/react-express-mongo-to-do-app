import { DELETE_TODO } from '../../constants/actionTypes';
import { createAction } from 'redux-actions';
import { apiDelete } from '../../api/Api';
import { urlToDos } from '../../api/urls';

export const deleteTodo = createAction(
    DELETE_TODO,
    id => apiDelete(urlToDos, id)
);