import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import ToDoForm from '../components/ToDoForm';
import { withRouter } from 'react-router-dom';
import { fetchTodos } from '../store/actions/fetchTodosAction';
import { insertTodo } from '../store/actions/insertTodoAction';
import { SubmissionError } from 'redux-form';

class NewTodoContainer extends Component {

    handleSubmit = (values) => {
        console.log('New container submit: ', values);

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("state", values.state);

        if (values.file) {
            formData.append("file", values.file);
        }

        return this.props.insertTodo(formData).then(result => {
            console.log("Se resolvio con exito", result)
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

    renderBody = () => {
        return (
            <ToDoForm
                onSubmit={this.handleSubmit}
                onSubmitSuccess={this.handleSubmitSuccess}
                onBack={this.handleOnBack}
            />
        );
    }

    render() {
        return (
            <AppFrame
                header={'Creacion de un To Do'}
                body={this.renderBody()}
            />
        );
    }
}

NewTodoContainer.propTypes = {
    insertTodo: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    fetchTodos,
    insertTodo
};

export default withRouter(connect(null, mapDispatchToProps)(NewTodoContainer));