import React from 'react';
import { shallow } from 'enzyme';
import MessageActions from './MessageActions';

// props se testing
const props = {
    children: <button>Test Button</button>
};

const newProps = {
    children: <h3>Test footer</h3>,
};

describe('<MessageActions/>', () => {
    test('render', () => {
        const wrapper = shallow(
            <MessageActions
                children={<div>Body</div>}
            />
        );
        expect(wrapper.find(MessageActions)).toBeDefined();
    });

    it('should have a button', () => {
        // creamos un wrapper que tenga nuestro componente
        const wrapper = shallow(<MessageActions {...props} />);
        // esperamos que ese wrapper que es nuestro componente tenga una imagen
        expect(wrapper.find('button')).toHaveLength(1);
    });

    it('should have h3 with value `Test footer`', () => {
        const wrapper = shallow(<MessageActions {...props} />);
        // modificamos las props con las nuevas
        wrapper.setProps(newProps);

        // esperamos que ese wrapper que es nuestro componente tenga un h3 con el titulo
        expect(wrapper.find('h3').text()).toEqual('Test footer');
    });
});