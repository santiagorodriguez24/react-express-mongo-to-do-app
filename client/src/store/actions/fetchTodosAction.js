import { FETCH_TODOS } from '../../constants/actionTypes';
import { createAction } from 'redux-actions';
import { apiGet } from '../../api/Api';
import { urlToDos } from '../../api/urls';

/* cuando el middleware redux-promise detecta que se esta pasando como payload una promise (como la promise devuelta por fetch)
retrasa el envio de la action al reducer hasta que se resuelva dicha promesa (obtencion de la respuesta del servidor) */
export const fetchTodos = createAction(
    FETCH_TODOS,
    (params) => apiGet(`${urlToDos}${params}`)
);