import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import ToDoForm from '../components/ToDoForm';
import ErrorPopUp from '../components/ErrorPopUp';
import { getError } from '../store/selectors/ToDoSelectors';
import { withRouter } from 'react-router-dom';
import { fetchTodos, insertTodo, changeTodoProps } from '../store/actions/ToDoActions';
import { SubmissionError } from 'redux-form';

class NewTodoContainer extends Component {

    handleSubmit = (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("state", values.state);

        if (values.file) {
            formData.append("file", values.file);
        }

        return this.props.insertTodo(formData).then(result => {
            console.log("The task was created.", result)
        }).catch(error => {
            throw new SubmissionError(error);
        });
    }

    handleSubmitSuccess = () => {
        this.props.history.goBack();
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <AppFrame
                header={'Creacion de un To Do'}
                body={
                    <Fragment>
                        <ToDoForm
                            isAdd={true}
                            onSubmit={this.handleSubmit}
                            onSubmitSuccess={this.handleSubmitSuccess}
                            onBack={this.handleOnBack}
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
                }
            />
        );
    }
}

NewTodoContainer.propTypes = {
    fetchTodos: PropTypes.func.isRequired,
    insertTodo: PropTypes.func.isRequired,
    changeTodoProps: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    error: getError(state)
});

const mapDispatchToProps = {
    fetchTodos,
    insertTodo,
    changeTodoProps
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTodoContainer));