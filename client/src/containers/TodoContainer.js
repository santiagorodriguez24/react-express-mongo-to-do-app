import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppFrame from '../components/AppFrame';
import { getTodoById } from '../store/selectors/todoSelectors';
import { Route, withRouter } from 'react-router-dom';
import ToDoForm from '../components/ToDoForm';
import ToDoView from '../components/ToDoView';
import { fetchTodos } from '../store/actions/fetchTodosAction';
import { updateTodo } from '../store/actions/updateTodoAction';
import { deleteTodo } from '../store/actions/deleteTodoAction';
import { SubmissionError } from 'redux-form';

class TodoContainer extends Component {

    componentDidMount() {
        if (!this.props.todo) {
            this.props.fetchTodos('');
        }
    }

    handleSubmit = (values) => {
        // convierto el objeto recibido en un string
        console.log('Todo Container OnSubmit: ', values);
        const { id } = values;

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("state", values.state);

        if (values.file || typeof values.file !== 'string') {
            formData.append("file", values.file);
        }

        /* 
        para que la propiedad submitting de redux-form se setee correctamente tenemos que devolver una promesa, y 
        el fetch que hace el PUT devuelve una
        */
        return this.props.updateTodo(id, formData)
            .then(result => {
                console.log("Se resolvio con exito", result)
            }).catch(error => {
                throw new SubmissionError(error);
            });
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    handleOnEdit = (id) => {
        this.props.history.push(`/todos/${id}/edit`);
    }

    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }

    handleOnDelete = id => {
        this.props.deleteTodo(id).then(response => {
            // si se resuelve la promise vuelvo al listado del cliente
            this.props.history.goBack();
        });
    }

    renderBody = () => {
        return (
            <Route
                path="/todos/:id/edit"
                children={props => {
                    // match no es un booleano, si la ruta coincide match es un objeto, de lo contrario es null (falsy value)
                    let { match: isEdit } = props;

                    // JSX permite determinar el componente a renderizar en tiempo de ejecucion
                    const TodoControl = isEdit ? ToDoForm : ToDoView; // si la url coincide con el path la propiedad match retorna true

                    return (
                        <TodoControl
                            {...this.props.todo} // pasamos todos los datos del To Do mediante el SPREAD operator
                            onSubmit={this.handleSubmit}
                            onSubmitSuccess={this.handleOnSubmitSuccess} // ante un envio exitoso del formulario redux-form ejecuta esta funcion
                            onBack={this.handleOnBack}
                            onEdit={this.handleOnEdit}
                            onDelete={this.handleOnDelete}
                        />
                    );

                }
                }
            />
        );
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
    deleteTodo: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
    todo: getTodoById(state, props)
});

const mapDispatchToProps = {
    fetchTodos,
    updateTodo,
    deleteTodo
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoContainer));
