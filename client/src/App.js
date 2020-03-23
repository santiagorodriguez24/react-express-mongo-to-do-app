import React, { Component } from 'react';
import './styles/app.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ROUTE_HOME, ROUTE_TODOS, ROUTE_TODO_ADD, ROUTE_TODO } from './constants/routes';
import HomeContainer from './containers/HomeContainer';
import TodosListContainer from './containers/TodosListContainer';
import TodoContainer from './containers/TodoContainer';
import NewTodoContainer from './containers/NewTodoContainer';
import NotFoundPage from './components/NotFoundPage';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path={ROUTE_HOME}
            render={props => <HomeContainer {...props} />}
          >
          </Route>
          <Route
            exact
            path={ROUTE_TODOS}
            render={props => <TodosListContainer {...props} />}
          >
          </Route>
          <Route
            path={ROUTE_TODO_ADD}
            render={props => <NewTodoContainer {...props} />}
          >
          </Route>
          <Route
            path={ROUTE_TODO}
            render={props => <TodoContainer id={props.match.params.id} />}
          >
          </Route>
          <Route
            render={props => <NotFoundPage {...props} />}
          >
          </Route>
        </Switch>
      </Router>
    );
  }

}

export default App;
