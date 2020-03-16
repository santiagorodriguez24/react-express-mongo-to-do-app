import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from './AppHeader';

// props se testing
const props = {
    title: 'title test',
};

const newProps = {
    title: 'new title test',
};

describe('<AppHeader/>', () => {
    test('render', () => {
        const wrapper = shallow(<AppHeader {...props}/>);
        expect(wrapper.find(AppHeader)).toBeDefined();
    });

    it('should have an image', () => {
        // creamos un wrapper que tenga nuestro componente
        const wrapper = shallow(<AppHeader {...props} />);
        // esperamos que ese wrapper que es nuestro componente tenga una imagen
        expect(wrapper.find('img')).toHaveLength(1);
    });

    it('should have title with value `title test`', () => {
        const wrapper = shallow(<AppHeader {...props} />);
        // esperamos que ese wrapper que es nuestro componente tenga un h3 con el titulo
        expect(wrapper.find('h1').text()).toEqual(props.title);
    });

    it('should have title with new value `title test`', () => {
        const wrapper = shallow(<AppHeader {...props} />);
        // modificamos las props con las nuevas
        wrapper.setProps(newProps);
        // esperamos que ese wrapper que es nuestro componente tenga un h3 con el titulo nuevo
        expect(wrapper.find('h1').text()).toEqual(newProps.title);
    });
});