import React from 'react';
import { mount, shallow } from 'enzyme';
import AppFrame from './AppFrame';
import ToDoView from './ToDoView';
import { toDoList } from '../constants/testValues';

const onBackResult = 'onBack function called.';

describe('<ToDoView/>', () => {

    test('Render without crashing.', () => {

        const wrapper = shallow(
            <ToDoView {...toDoList[0]} onBack={() => onBackResult} />
        );

        expect(wrapper.find(AppFrame)).toBeDefined();

    });

    it('Props are properly defined and initialized.', () => {

        const wrapper = mount(
            <ToDoView {...toDoList[0]} onBack={() => onBackResult} />
        );

        Object.entries(wrapper.props()).forEach(([key, value]) => {
            if (typeof value !== 'function') {
                expect(wrapper.prop(key)).toEqual(toDoList[0][key]);
            }
        });

        wrapper.setProps(toDoList[1]);

        Object.entries(wrapper.props()).forEach(([key, value]) => {
            if (key !== 'onBack') {
                expect(wrapper.prop(key)).toEqual(toDoList[1][key]);
            }
        });

        wrapper.unmount();

    });

    it('Back Button Works.', () => {

        const wrapper = shallow(
            <ToDoView {...toDoList[0]} onBack={() => onBackResult} />
        );

        expect(wrapper.find('.back')).toHaveLength(2);
        expect(wrapper.find('.back').first().props().onClick()).toEqual(onBackResult);

    });

    it('Clicking the delete button opens the confirmation modal.', () => {

        const wrapper = mount(
            <ToDoView {...toDoList[0]} onBack={() => onBackResult} />
        );

        const deleteButton = wrapper.find('.delete').first();

        deleteButton.simulate('click');

        const deleteModal = wrapper.find('.message-modal').at(0);

        expect(deleteModal.prop('isOpen')).toBeTruthy();

        wrapper.unmount();

    });

});