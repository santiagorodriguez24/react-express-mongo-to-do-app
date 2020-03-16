import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
//import { render } from 'enzyme';
import { Provider } from 'react-redux';
import { store } from './store/store';

describe('APP Level Test:', () => {
  test('App.js renders without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});