import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter } from "react-router-dom";
import configureStore from 'redux-mock-store';
import { toDoList, storeState } from '../constants/testValues';
import { ROUTE_TODO_EDIT, ROUTE_TODO } from '../constants/routes';
import TodoContainer from './TodoContainer';
import ToDoView from '../components/ToDoView';
import ToDoForm from '../components/ToDoForm';

const mockStore = configureStore();

describe('<TodoContainer/>', () => {

    const store = mockStore(storeState);
    const root = document.createElement('div');
    document.body.appendChild(root);

    test('Render ToDoView Component when location path is ROUTE_TODO.', () => {

        const wrapper = mount(
            <MemoryRouter>
                <TodoContainer store={store} id={toDoList[0].id.toString()} />
            </MemoryRouter>,
            { attachTo: root }
        );

        let todoview = wrapper.find(ToDoView);

        Object.entries(todoview.props()).forEach(([key, value]) => {
            if (typeof value !== 'function') {
                expect(todoview.prop(key)).toEqual(toDoList[0][key]);
            }
        });

        wrapper.unmount();
    });

    test('Clicking the edit button of the ToDoView component redirects to the ToDoForm Component.', () => {

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <TodoContainer id={toDoList[0].id.toString()} />
                </MemoryRouter>
            </Provider>,
            { attachTo: root }
        );

        expect(wrapper.find(ToDoView)).toHaveLength(1);
        expect(wrapper.find(ToDoForm)).toHaveLength(0);

        const editButton = wrapper.find('.edit').hostNodes();
        editButton.simulate('click');

        expect(wrapper.find(ToDoView)).toHaveLength(0);
        expect(wrapper.find(ToDoForm)).toHaveLength(1);

        wrapper.unmount();

    });

});