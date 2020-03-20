import { combineReducers } from 'redux';
import { todos } from './ToDoReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
    todos,
    form: reduxForm
});