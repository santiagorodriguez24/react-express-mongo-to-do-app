import { todos } from './ToDoReducer';
import { toDoList, storeState } from '../../constants/testValues';
import { FETCH_TODOS, INSERT_TODO, UPDATE_TODO, DELETE_TODO, CHANGE_TODO_PROPS } from '../../constants/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
    todos: [],
    error: ''
};

const newTodo = {
    state: 'DONE',
    _id: '5e72994392daab47c0aad2435',
    title: 'Dance',
    description: 'To move the body and feet to music.',
    file: 'uploads/playlist.txt',
    id: 5
};

describe('ToDoReducer.js', () => {

    test("If the received action doesn't exist, it returns the initial state.", () => {

        let newState = todos(
            initialState,
            { type: 'RANDOM_ACTION', payload: [] }
        );

        expect(newState).toEqual(initialState);

    });

    test("CHANGE_TODO_PROPS works.", () => {

        const newError = 'An error has occurred.'

        let newState = todos(
            initialState,
            { type: CHANGE_TODO_PROPS, payload: { error: newError } }
        );

        expect(newState.error).toBe(newError);

    });

    test("FETCH_TODOS works.", () => {

        let newState = todos(
            initialState,
            { type: FETCH_TODOS, payload: { todos: toDoList } }
        );

        expect(newState).toEqual(storeState.todos);

    });

    test("INSERT_TODO works.", () => {

        let newState = todos(
            storeState.todos,
            { type: INSERT_TODO, payload: { todo: newTodo, error: '' } }
        )

        expect(newState.todos).toContain(newTodo);

    });

    test("UPDATE_TODO works.", () => {

        let newTodoCopy = cloneDeep(newTodo);
        newTodoCopy.id = storeState.todos.todos[0].id;

        let newState = todos(
            storeState.todos,
            { type: UPDATE_TODO, payload: { todo: newTodoCopy, error: '' } }
        );

        Object.entries(newState.todos[0]).forEach(([key, value]) => {

            expect(value).toEqual(newTodoCopy[key]);

        });

    });

    test("DELETE_TODO works.", () => {

        let todoToDelete = cloneDeep(storeState.todos.todos[0]);

        let newState = todos(
            storeState.todos,
            { type: DELETE_TODO, payload: { todo: todoToDelete, error: '' } }
        );

        expect(newState.todos).not.toContain(todoToDelete);

    });

});