import React from 'react';
import { mount } from 'enzyme';
import ToDoView from './ToDoView';
import { toDoList } from '../constants/testValues';

describe('<ToDoView/>', () => {

    let wrapper;
    const onBack = jest.fn();

    beforeAll(() => {
        wrapper = mount(
            <ToDoView {...toDoList[0]} onBack={onBack} />
        );
    });

    test('Renders without crashing.', () => {
        expect(wrapper.find('.todo-view').hostNodes()).toHaveLength(1);
    });

    it('Props are properly defined and initialized.', () => {

        Object.entries(wrapper.props()).forEach(([key, value]) => {
            if (typeof value !== 'function') {
                expect(wrapper.prop(key)).toEqual(toDoList[0][key]);
            }
        });

        expect(wrapper.find('.card-header').text()).toEqual(toDoList[0].title);
        expect(wrapper.find('i').at(0).text()).toEqual(toDoList[0].description);

        wrapper.setProps(toDoList[1]);

        Object.entries(wrapper.props()).forEach(([key, value]) => {
            if (typeof value !== 'function') {
                expect(wrapper.prop(key)).toEqual(toDoList[1][key]);
            }
        });

    });

    it('Back Button Works.', () => {

        wrapper.find('.back').first().props().onClick();
        expect(onBack).toHaveBeenCalledTimes(1);

    });

    it('Clicking the delete button opens the confirmation modal.', () => {

        const deleteButton = wrapper.find('.delete').first();
        let deleteModal = wrapper.find('.message-modal').at(0);

        expect(deleteModal.prop('isOpen')).toBeFalsy();

        deleteButton.simulate('click');

        let deleteModalAfter = wrapper.find('.message-modal').at(0);
        expect(deleteModalAfter.prop('isOpen')).toBeTruthy();

    });

    afterAll(() => {
        wrapper.unmount();
    });

});