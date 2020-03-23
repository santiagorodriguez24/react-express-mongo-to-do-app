import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ToDoForm from './ToDoForm';
import { toDoList } from '../constants/testValues';
import { MemoryRouter } from "react-router-dom";

describe('<ToDoForm/>', () => {

    let wrapper;
    const handleSubmit = jest.fn();

    beforeAll(() => {
        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <ToDoForm
                        {...toDoList[0]}
                        onBack={() => console.log('onBack')}
                        handleSubmit={handleSubmit}
                    />
                </MemoryRouter>
            </Provider>
        );

    });

    it("Fills the inputs with default values", () => {
        const inputTitle = wrapper.find('input').findWhere(n => n.prop('name') === 'title');
        const inputDescription = wrapper.find('textarea').findWhere(n => n.prop('name') === 'description');
        const inputState = wrapper.find('select').findWhere(n => n.prop('name') === 'state');

        expect(inputTitle.prop("value")).toBe(toDoList[0].title);
        expect(inputDescription.prop("value")).toBe(toDoList[0].description);
        expect(inputState.prop("value")).toBe(toDoList[0].state);
    });

    it('Is necessary change at least one field to enable save button and submit form.', () => {

        const saveButton = wrapper.find('.edit').first();
        saveButton.simulate('click');

        expect(handleSubmit).toHaveBeenCalledTimes(0);

        const descriptionField = wrapper.find('textarea').first();
        descriptionField.simulate('change', { target: { value: 'new description' } });

        saveButton.simulate('click');

        expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    afterAll(() => {
        wrapper.unmount();
    });

});