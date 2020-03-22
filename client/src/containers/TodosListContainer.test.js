import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { storeState } from '../constants/testValues';
import { MemoryRouter } from 'react-router-dom';
import TodoListContainer from './TodosListContainer';

const mockStore = configureStore();


describe('TodoListContainer Test:', () => {

    beforeAll(() => {
        window['__react-beautiful-dnd-disable-dev-warnings'] = true;
    });

    it('If the message property does not exist, do not show the alert', () => {
        const store = mockStore(storeState);

        const wrapper = mount(
            <MemoryRouter>
                <TodoListContainer store={store} />
            </MemoryRouter>
        );

        expect(wrapper.find('.alert').length).toBe(0);

        wrapper.unmount();
    });

}); 