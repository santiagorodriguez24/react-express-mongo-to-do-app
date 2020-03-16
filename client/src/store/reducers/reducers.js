import { combineReducers } from 'redux';
import { todos } from './ToDoReducer';
import { reducer as reduxForm } from 'redux-form'; // redux form nos provee un reducer

export default combineReducers({
    todos,
    form: reduxForm
});