import React from 'react';
import { shallow, render } from 'enzyme';
import AppHeader from './AppHeader';

const props = {
    title: 'Test Title',
};

const newProps = {
    title: 'New Test Title',
};

describe('<AppHeader/>', () => {

    it('Should have 1 reactstrap Row with 2 Columns inside.', () => {
        const wrapper = render(<AppHeader {...props} />);

        const row = wrapper.find('.row');

        expect(row.length).toBe(1);
        expect(row.children().length).toBe(wrapper.find('.col-auto').length);
    });

    it('Should have a ToDo Logo.', () => {

        const wrapper = shallow(<AppHeader {...props} />);

        expect(wrapper.find('.todo-logo')).toHaveLength(1);
    });

    it('Should have a title prop with value "Test Title".', () => {
        const wrapper = shallow(<AppHeader {...props} />);

        expect(wrapper.find('h1').text()).toEqual(props.title);
    });

    it('Should have a title prop with new value.', () => {
        const wrapper = shallow(<AppHeader {...props} />);

        wrapper.setProps(newProps);

        expect(wrapper.find('h1').text()).toEqual(newProps.title);
    });

});