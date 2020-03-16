import React from 'react';
import { render, shallow } from 'enzyme';
import AppFrame from './AppFrame';

describe('<AppFrame/>', () => {
    test('render', () => {
        const wrapper = shallow(
            <AppFrame
                header='cabecera'
                body={<div>Body</div>}
            />
        );
        expect(wrapper.find(AppFrame)).toBeDefined();
    });
});