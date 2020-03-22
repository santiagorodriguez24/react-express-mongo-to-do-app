import React from 'react';
import App from './App';
import { mount, render } from 'enzyme';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { toDoList, storeState } from './constants/testValues';
import { ROUTE_TODOS, ROUTE_TODO_ADD, ROUTE_TODO } from './constants/routes';
import TodoListContainer from './containers/TodosListContainer';
import ToDoView from './components/ToDoView';

const mockStore = configureStore();

describe('<App />', () => {

  beforeAll(() => {
    window['__react-beautiful-dnd-disable-dev-warnings'] = true;
  });

  test('Renders Home Page by default.', () => {
    const wrapper = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find('.home-container')).toHaveLength(1);
  });

  test('Render ToDoListContainer Component when location path is ROUTE_TODOS.', () => {
    const store = mockStore(storeState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTE_TODOS]}>
          <App />
        </MemoryRouter>
      </Provider>
    );


    expect(wrapper.find(TodoListContainer)).toHaveLength(1);

    // wrapper.find('.todos-list').length = 6
    //  STRUCTURE OF MOUNTED COMPONENT:
    //   <Col className="todos-list" tag="div" widths={{...}}>
    //     <div className="todos-list col">

    expect(wrapper.find('.todos-list').hostNodes()).toHaveLength(3);
    expect(wrapper.find('div.todos-list')).toHaveLength(3);

    wrapper.unmount();

  });

  test('Render ToDoForm Component when path is ROUTE_TODO_ADD.', () => {
    const store = mockStore(storeState);

    const wrapper = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTE_TODO_ADD]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.todo-form')).toHaveLength(1);

  });

  test('Render ToDoView Component when location path is ROUTE_TODO.', () => {
    const store = mockStore(storeState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[ROUTE_TODO.replace(':id', toDoList[0].id)]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    let todoview = wrapper.find(ToDoView);

    Object.entries(todoview.props()).forEach(([key, value]) => {
      if (typeof value !== 'function') {
        expect(todoview.prop(key)).toEqual(toDoList[0][key]);
      }
    });

    wrapper.unmount();
  });

  test('Invalid path should redirect to Not Found Page.', () => {

    const wrapper = render(
      <MemoryRouter initialEntries={['/random']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find('.not-found-image')).toHaveLength(1);

  });
});