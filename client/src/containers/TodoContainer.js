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
            this.props.fetchTodos();
        }
    }

    // handleSubmit = (event) => {
    //     let descripcion = event.target.description.value;
    //     let archivo = event.target.file.files[0];

    //     const formData = new FormData()
    //     formData.append("descripcion", descripcion);

    //     if (archivo) {
    //         formData.append("archivo", archivo);
    //     }

    //     console.log('On submit formdata: ', formData);

    //     fetch("/todo", {
    //         mode: 'no-cors',
    //         method: "POST",
    //         body: formData
    //     }).then(response => response.json())
    //         .then(responseJson => {
    //             if (responseJson.error) {
    //                 return Promise.reject(responseJson.validation)
    //             }

    //             return responseJson;
    //         })
    //         .then(result => {
    //             console.log("Se resolvio con exito: ", result)
    //             this.setState({
    //                 result
    //             })
    //         })
    //         .catch(error => {
    //             console.log("Hubo un error: ", error);
    //         });
    // }

    handleSubmit = (values) => {
        // convierto el objeto recibido en un string
        console.log('OnSubmit: ', values);
        // console.log('OnSubmit: ', JSON.stringify(values));
        // const { id } = values;
        /* para que la propiedad submitting de redux-form se setee correctamente tenemos que devolver una promesa, y 
        el fetch que hace el PUT devuelve una
        */
        // return this.props.updateTodo(id, values)
        //     .then(result => {
        //         console.log("Se resolvio con exito", result)
        //     }).catch(error => {
        //         throw new SubmissionError(error);
        //     });
    }

    handleOnBack = () => {
        console.log('handleOnBack: ');
        this.props.history.goBack();
    }

    handleOnSubmitSuccess = () => {
        console.log('handleOnSubmitSuccess: ');
        this.props.history.goBack();
    }

    handleOnDelete = id => {
        console.log('handleOnDelete');
        this.props.deleteTodo(id).then(response => {
            // si se resuelve la promise vuelvo al listado del cliente
            this.props.history.goBack();
        });
    }

    renderTodoControl = (isEdit, isDelete) => {
        // JSX permite determinar el componente a renderizar en tiempo de ejecucion
        const TodoControl = isEdit ? ToDoForm : ToDoView; // si la url coincide con el path la propiedad match retorna true

        return (
            <TodoControl
                {...this.props.todo} // pasamos todos los datos del To Do mediante el SPREAD operator
                onSubmit={this.handleSubmit}
                onSubmitSuccess={this.handleOnSubmitSuccess} // ante un envio exitoso del formulario redux-form ejecuta esta funcion
                onBack={this.handleOnBack}
                isDeleteAllow={!!isDelete} // doble negacion transforma falsy value en booleano: !null = true => !!null = false
                onDelete={this.handleOnDelete}
            />
        );
    }

    renderBody = () => {
        return (
            <Route
                path="/todos/:id/edit"
                children={props => {
                    // match no es un booleano, si la ruta coincide match es un objeto, de lo contrario es null (falsy value)
                    let { match: isEdit } = props;

                    return (
                        <Route
                            path="/todos/:id/delete"
                            children={({ match: isDelete }) => (this.renderCustomerControl(isEdit, isDelete))}
                        />
                    );

                }
                }
            />
        );
    }

    render() {
        return (
            <div>
                <AppFrame
                    header={`To Do - ${this.props.id}`}
                    body={
                        this.renderBody()
                    }
                ></AppFrame>
            </div>
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
