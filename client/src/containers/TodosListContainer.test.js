import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { storeState, toDoList } from '../constants/testValues';
import TodoListContainer from './TodosListContainer';
import ErrorPopUp from '../components/ErrorPopUp';
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore();

describe('<TodoListContainer/>', () => {

    let wrapper;
    const root = document.createElement('div');
    document.body.appendChild(root);
    const store = mockStore(storeState);

    beforeAll(() => {
        window['__react-beautiful-dnd-disable-dev-warnings'] = true;

        wrapper = mount(
            <TodoListContainer store={store} />,
            { attachTo: root }
        );

    });

    /* 
    reactstrap tooltip (Action Bar) looks in the document for the target and 
    if the target is mounted outside of the document it cannot find it and throws an error. 
    */

    it('Tasks render correctly.', () => {

        const component = wrapper.children();

        expect(wrapper.find('.list-group')).toHaveLength(3);

        const todos = component.prop('todos');

        expect(wrapper.find('.list-group-item')).toHaveLength(todos.length);

        const PendingToDos = component.prop('PendingToDos');
        const pendingList = wrapper.find('.list-group').at(0);

        expect(pendingList.find('.list-group-item')).toHaveLength(PendingToDos.length);

        const InProgressToDos = component.prop('InProgressToDos');
        const inProgressList = wrapper.find('.list-group').at(1);

        expect(inProgressList.find('.list-group-item')).toHaveLength(InProgressToDos.length);

        const DoneToDos = component.prop('DoneToDos');
        const DoneList = wrapper.find('.list-group').at(2);

        expect(DoneList.find('.list-group-item')).toHaveLength(DoneToDos.length);

    });

    it('Render ActionsBar filters.', () => {

        // wrapper.find('.filter-input').length = 8 instead of 4
        //  STRUCTURE OF MOUNTED COMPONENT:
        // <Input
        //     type="text" name="id" id="id-0"
        //     placeholder="Filter by ID"
        //     onChange={[Function: onChange]}
        //     className="filter-input"
        // >
        //     <input
        //         type="text" name="id" id="id-0"
        //         placeholder="Filter by ID"
        //         onChange={[Function: onChange]}
        //         className="filter-input form-control"
        //     />
        // </Input>

        let filters = wrapper.children().instance().filters;
        const inputs = wrapper.find('.filter-input').hostNodes();

        expect(inputs).toHaveLength(filters.length);

        for (var i = 0; i < inputs.length; i++) {
            expect(inputs.at(i).prop('name')).toEqual(filters[i].name);
            expect(inputs.at(i).prop('placeholder')).toEqual(filters[i].placeholder);
        }

    });

    it('Changing the filters updates the state.', () => {

        const component = wrapper.children();

        component.state().filter.forEach(element => {
            expect(element.value).toEqual('');
        });

        const inputs = wrapper.find('.filter-input').hostNodes();

        let filtersValues = [];

        for (var i = 0; i < inputs.length; i++) {
            let value = `filter ${i} value`;
            inputs.at(i).simulate('change', { target: { value: value } });
            filtersValues.push(value);
        }

        component.state().filter.forEach((element, index) => {
            expect(element.value).toEqual(filtersValues[index]);
        });

    });

    it('No Redux error no renders ErrorPopUp.', () => {

        const component = wrapper.children();

        const error = component.prop('error');
        expect(error).toEqual('');
        expect(wrapper.find(ErrorPopUp)).toHaveLength(0);

    });

    it('Redux error show up ErrorPopUp.', () => {
        const newStoreState = {
            todos: {
                todos: toDoList,
                error: 'An error has occurred.'
            },
            form: {}
        };

        const NewStore = mockStore(newStoreState);

        const root2 = document.createElement('div');
        document.body.appendChild(root2);

        const wrap = mount(
            <MemoryRouter>
                <TodoListContainer store={NewStore} />
            </MemoryRouter>,
            { attachTo: root2 }
        );

        const connectedComponet = wrap.find(TodoListContainer);

        const component = connectedComponet.children();

        const error = component.prop('error');
        expect(error).toEqual(newStoreState.todos.error);
        expect(component.find(ErrorPopUp)).toHaveLength(1);

        wrap.unmount();
    });

    afterAll(() => {
        wrapper.unmount();
    });

}); 