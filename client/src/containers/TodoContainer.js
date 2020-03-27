import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import ErrorPopUp from '../components/ErrorPopUp';
import { getTodoById, getError } from '../store/selectors/ToDoSelectors';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { ROUTE_TODO_EDIT } from '../constants/routes';
import ToDoForm from '../components/ToDoForm';
import ToDoView from '../components/ToDoView';
import { fetchTodos, updateTodo, deleteTodo, changeTodoProps } from '../store/actions/ToDoActions';
import { SubmissionError } from 'redux-form';

class TodoContainer extends Component {

    componentDidMount() {
        if (!this.props.todo) {
            this.props.fetchTodos('');
        }
    }

    handleSubmit = (values) => {
        const { id } = values;

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("state", values.state);

        if (values.file || typeof values.file !== 'string') {
            formData.append("file", values.file);
        }

        // In order for the submitting redux-form prop to set correctly we have to return a promise.
        return this.props.updateTodo(id, formData)
            .then(result => {
                console.log("Task updated.", result)
            }).catch(error => {
                throw new SubmissionError(error);
            });
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    handleOnEdit = (id) => {
        this.props.history.push(ROUTE_TODO_EDIT.replace(":id", id));
    }

    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }

    handleOnDelete = id => {
        this.props.deleteTodo(id).then(response => {
            this.props.history.goBack();
        });
    }

    renderBody = () => {
        if (this.props.todo) {
            return (
                <Route
                    path={ROUTE_TODO_EDIT}
                    children={props => {
                        let { match: isEdit } = props;
                        const TodoControl = isEdit ? ToDoForm : ToDoView;

                        return (
                            <Fragment>
                                <TodoControl
                                    {...this.props.todo}
                                    onSubmit={this.handleSubmit}
                                    onSubmitSuccess={this.handleOnSubmitSuccess}
                                    onBack={this.handleOnBack}
                                    onEdit={this.handleOnEdit}
                                    onDelete={this.handleOnDelete}
                                />
                                {
                                    // if some action get an error handle this
                                    this.props.error && this.props.error !== '' ?
                                        <ErrorPopUp
                                            message={this.props.error}
                                            reloadPage={() => document.location.reload()}
                                            removeErrorProp={this.props.changeTodoProps}
                                        />
                                        :
                                        null
                                }
                            </Fragment>
                        );

                    }
                    }
                />
            );
        }
        else {
            return <Redirect to="/not-found" />
        }
    }

    render() {

        return (
            <AppFrame
                header={`Task - ID: ${this.props.id}`}
                body={
                    this.renderBody()
                }
            />
        );
    }
}

TodoContainer.propTypes = {
    id: PropTypes.string.isRequired,
    todo: PropTypes.object,
    fetchTodos: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    changeTodoProps: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => ({
    todo: getTodoById(state, props),
    error: getError(state)
});

const mapDispatchToProps = {
    fetchTodos,
    updateTodo,
    deleteTodo,
    changeTodoProps
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoContainer));
