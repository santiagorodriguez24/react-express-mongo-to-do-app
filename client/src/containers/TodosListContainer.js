import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import ActionsBar from '../components/ActionsBar';
import ErrorPopUp from '../components/ErrorPopUp';
import { Row, Col, Card, CardHeader, CardBody, ToastHeader, ToastBody } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTodos, updateTodo, changeTodoProps } from '../store/actions/ToDoActions';
import { getTodos, getError, getTodosByState } from '../store/selectors/ToDoSelectors';
import { stateOptions } from '../constants/options';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaRegListAlt, FaSpinner, FaCheck } from 'react-icons/fa';

class TodoListContainer extends Component {
    constructor() {
        super();
        this.state = {
            filter: [
                { key: 'id', value: '' },
                { key: 'title', value: '' },
                { key: 'description', value: '' },
                { key: 'state', value: '' }
            ]
        }
    }

    componentDidMount() {
        if (this.props.todos.length === 0) {
            this.props.fetchTodos('');
        }
    }

    handleAddNew = () => {
        this.props.history.push('/todos/new')
    }

    onChangeFilter = (e, index) => {
        const { filter } = this.state;

        filter[index].value = e.target.value;

        let query = '';

        filter.forEach(element => {
            if (element.value) {
                query = query ? `${query}&${element.key}=${element.value}` : `?${element.key}=${element.value}`;
            }
        });

        let formattedQuery = query.replace(/ /g, "+");

        this.setState({
            filter
        },
            () => this.props.fetchTodos(formattedQuery)
        )

    }

    toTaskView = (id) => {
        this.props.history.push(`/todos/${id}`);
    }

    onDragEnd = (result) => {
        const { destination, source, draggableId: id } = result;

        if (!destination || (source.droppableId === destination.droppableId)) {
            return;
        }

        const formData = new FormData();

        formData.append("state", destination.droppableId);

        return this.props.updateTodo(id, formData)
            .then(result => {
                console.log("Task updated.", result)
            }).catch(error => {
                console.log("Failed to update task.", error)
            });
    }


    renderList = (items) => {
        let itemClass = 'list-group-item toast fade show';

        let result = items.map((item, index) => {
            return (
                <Draggable draggableId={item.id.toString()} index={index} key={`task-${item.state}-${index}`}>
                    {(provided, snapshot) => (
                        <div
                            onClick={() => this.toTaskView(item.id)}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={snapshot.isDragging ? `${itemClass} is-dragging` : itemClass}
                        >
                            <ToastHeader>
                                {item.title}
                            </ToastHeader>
                            <ToastBody>
                                <div><strong>{`ID: `}</strong>{item.id}</div>
                                <div><strong>{`Description: `}</strong>{item.description}</div>
                                {
                                    item.file ?
                                        <div><strong>{`File: `}</strong>{item.file.replace("uploads/", "")}</div>
                                        :
                                        null
                                }
                            </ToastBody>
                        </div>
                    )}
                </Draggable>
            );
        });

        return (result);

    }

    render() {
        const { pendingToDos, InProgressToDos, DoneToDos } = this.props;

        const TaskListArray = [pendingToDos, InProgressToDos, DoneToDos];
        const IconsArray = [FaRegListAlt, FaSpinner, FaCheck];

        return (
            <AppFrame
                header={'Things To Do'}
                body={
                    <Fragment>
                        <ActionsBar
                            onAdd={this.handleAddNew}
                            filters={[
                                { name: 'id', label: 'ID: ', placeholder: 'Filter by ID', onChange: this.onChangeFilter },
                                { name: 'title', label: 'Title: ', placeholder: 'Filter by Title', onChange: this.onChangeFilter },
                                { name: 'description', label: 'Description: ', placeholder: 'Filter by Description', onChange: this.onChangeFilter },
                                { name: 'state', label: 'State: ', type: 'select', options: stateOptions, placeholder: 'Filter by state', onChange: this.onChangeFilter }
                            ]}
                        />
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Row className='row-list-container'>
                                {
                                    TaskListArray.map((taskList, index) => {
                                        let Icon = IconsArray[index];
                                        return (
                                            <Col key={`taskList-key-${index}`} className='todos-list'>
                                                <Card>
                                                    <CardHeader>
                                                        {stateOptions[index]}
                                                        <Icon size={25} />
                                                    </CardHeader>
                                                    <CardBody>
                                                        <Droppable droppableId={stateOptions[index]}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.droppableProps}
                                                                    className={snapshot.isDraggingOver ? 'list-group is-dragging-over' : 'list-group'}
                                                                >
                                                                    {this.renderList(taskList)}
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        </DragDropContext>
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

TodoListContainer.propTypes = {
    fetchTodos: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    changeTodoProps: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    pendingToDos: PropTypes.array.isRequired,
    InProgressToDos: PropTypes.array.isRequired,
    DoneToDos: PropTypes.array.isRequired,
    error: PropTypes.string.isRequired
};

TodoListContainer.defaultProps = {
    todos: [],
    pendingToDos: [],
    InProgressToDos: [],
    DoneToDos: []
};

const mapStateToProps = state => ({
    todos: getTodos(state),
    pendingToDos: getTodosByState(state, stateOptions[0]),
    InProgressToDos: getTodosByState(state, stateOptions[1]),
    DoneToDos: getTodosByState(state, stateOptions[2]),
    error: getError(state)
});

const mapDispatchToProps = {
    fetchTodos,
    updateTodo,
    changeTodoProps
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListContainer));