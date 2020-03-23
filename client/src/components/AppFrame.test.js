import React from 'react';
import { shallow } from 'enzyme';
import AppFrame from './AppFrame';
import ToDoView from './ToDoView';
import { toDoList } from '../constants/testValues';
import AppHeader from './AppHeader';

const body = <ToDoView {...toDoList[0]} onBack={() => 'onBack'} />;

describe('<AppFrame/>', () => {

    let wrapper;

    beforeAll(() => {
        wrapper = shallow(
            <AppFrame
                header='Test Header'
                body={body}
            />
        );
    });

    test('Has app-frame class.', () => {
        expect(wrapper.find('.app-frame')).toHaveLength(1);
    });

    it('Render App Header Component.', () => {
        expect(wrapper.containsMatchingElement(<AppHeader title={'Test Header'} />)).toBeTruthy();
    });

    it('Render ToDoView Component defined as body prop.', () => {
        expect(wrapper.containsMatchingElement(body)).toBeTruthy();
    });

});