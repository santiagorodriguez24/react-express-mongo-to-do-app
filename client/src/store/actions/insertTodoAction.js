import { INSERT_TODO } from '../../constants/actionTypes';
import { createAction } from 'redux-actions';
import { apiPostFormData } from '../../api/Api';
import { urlToDos } from '../../api/urls';

export const insertTodo = createAction(
    INSERT_TODO,
    (todo) => apiPostFormData(urlToDos, todo)
);