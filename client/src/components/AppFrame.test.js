import React from 'react';
import { render, shallow } from 'enzyme';
import AppFrame from './AppFrame';
import ToDoView from './ToDoView';
import { toDoList } from '../constants/testValues';
import AppHeader from './AppHeader';

const body = <ToDoView {...toDoList[0]} onBack={() => 'onBack'} />;

describe('<AppFrame/>', () => {
    test('Render without crashing.', () => {
        const wrapper = shallow(
            <AppFrame
                header='Test Header'
                body={<div>Body</div>}
            />
        );
        expect(wrapper.find(AppFrame)).toBeDefined();
    });

    it('Render App Header Component.', () => {
        const wrapper = shallow(
            <AppFrame
                header={'Test Header'}
                body={body}
            />
        );

        expect(
            wrapper.containsMatchingElement(
                <AppHeader title={'Test Header'} />
            )
        ).toBeTruthy();

    });

    it('Render ToDoView Component.', () => {
        const wrapper = render(
            <AppFrame
                header={'Test Header'}
                body={body}
            />
        );

        expect(wrapper.find('.card-header').text()).toEqual(toDoList[0].title);
        expect(wrapper.find('i')[0].children[0].data).toEqual(toDoList[0].description);
    });

});