import { handleActions } from 'redux-actions';
import { FETCH_TODOS, INSERT_TODO, UPDATE_TODO, DELETE_TODO } from '../../constants/actionTypes';

// Para varias acciones:
export const todos = handleActions(
    {   /* tomo lo que me viene en action.payload (lista de Todos) y genero una copia mediante spread operator */
        [FETCH_TODOS]: (state, action) => [...action.payload.todos],
        /* en el state tengo todos los ToDos a los cuales le agrego el nuevo cliente que llega en action.payload 
        en vez de recargar la lista llamando a fetch ToDos */
        [INSERT_TODO]: (state, action) => [...state, action.payload.todo],
        /* Se reemplaza el ToDo editado con sus nuevos valores para evitar recargar la lista de ToDos */
        [UPDATE_TODO]: (state, action) => {
            console.log('reducer update action: ',action);
            const todos = state;
            const editedTodo = action.payload.todo;
            const { _id } = editedTodo;

            /* reduce es una funcion de ES6 */
            let newTodos = todos.reduce(
                /* Como primer parametro pasamos una funcion que recorre el arreglo de clientes y en cada iteracion guarda 
                un elemento en el arreglo acumulador */
                (acumulador, todo) => {
                    /* si el _id del elemento coincide con el _id del ToDo editado se guarda el Todo editado en vez 
                    del elemento todo recibido como parametro de la funcion */
                    if (todo._id === _id) {
                        return [...acumulador, editedTodo];
                    } else {
                        return [...acumulador, todo]
                    }
                },
                // como segundo parametro pasamos el valor inicial, que en este caso es un arreglo vacio
                []
            );

            return newTodos;
        },

        [DELETE_TODO]: (state, action) => state.filter(todo => todo._id !== action.payload.todo._id)

    },
    [] // valor inicial del state
);