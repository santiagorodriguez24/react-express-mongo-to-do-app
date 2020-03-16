import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*
redux promise como todo middleware escucha cada una de las acciones, y detecta aquellas que tienen en su payload una promise,
ejecuta la promise y retiene la accion de manera que no llega inmediatamente al reducer (no invoca a next(action)) hasta ser resuelta. 
Una vez resuelta envia al reducer una copia de la accion y en el payload el resultado de la promise. Si la promise finaliza en error
genera una accion con el error en el payload y establece la propiedad boolean "error" en true.
*/

export const store = createStore(
    reducers,
    {},
    composeEnhancers(
        applyMiddleware(promiseMiddleware)
    )
);