import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import ActionsBar from '../components/ActionsBar';
import { Container, Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Toast, ToastHeader, ToastBody } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTodos } from '../store/actions/fetchTodosAction';
import { getTodos } from '../store/selectors/todoSelectors';
import { getTodosByState } from '../store/selectors/todoSelectors';
import { stateOptions } from '../constants/options';

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
        () =>  this.props.fetchTodos(formattedQuery)
        )

    }

    toTaskView = (id) => {
        this.props.history.push(`/todos/${id}`);
    }

    renderList = (items) => {

        return (
            <ListGroup>
                {
                    items.map((item, index) => {
                        return (
                            <ListGroupItem
                                tag={Toast}
                                key={`task-${item.state}-${index}`}
                                onClick={() => this.toTaskView(item.id)}
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
                            </ListGroupItem>
                        );
                    })
                }
            </ListGroup>
        );

    }

    render() {
        const { pendingToDos, InProgressToDos, DoneToDos } = this.props;

        return (
            <AppFrame
                header={'Things To Do'}
                body={
                    <Container fluid>
                        <ActionsBar
                            onAdd={this.handleAddNew}
                            filters={[
                                { name: 'id', label: 'ID: ', placeholder: 'Filter by ID', onChange: this.onChangeFilter },
                                { name: 'title', label: 'Title: ', placeholder: 'Filter by Title', onChange: this.onChangeFilter },
                                { name: 'description', label: 'Description: ', placeholder: 'Filter by Description', onChange: this.onChangeFilter },
                                { name: 'state', label: 'State: ', type: 'select', options: stateOptions, placeholder: 'Filter by state', onChange: this.onChangeFilter }
                            ]}
                        />
                        <Row>
                            <Col>
                                <Card className='todos-card'>
                                    <CardHeader>
                                        {stateOptions[0]}
                                    </CardHeader>
                                    <CardBody>
                                        {this.renderList(pendingToDos)}
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card className='todos-card'>
                                    <CardHeader>
                                        {stateOptions[1]}
                                    </CardHeader>
                                    <CardBody>
                                        {this.renderList(InProgressToDos)}
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card className='todos-card'>
                                    <CardHeader>
                                        {stateOptions[2]}
                                    </CardHeader>
                                    <CardBody>
                                        {this.renderList(DoneToDos)}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                }
            />
        );
    }
}


TodoListContainer.propTypes = {
    fetchTodos: PropTypes.func.isRequired,
    todos: PropTypes.array.isRequired,
    pendingToDos: PropTypes.array.isRequired,
    InProgressToDos: PropTypes.array.isRequired,
    DoneToDos: PropTypes.array.isRequired
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
});

const mapDispatchToProps = {
    fetchTodos
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListContainer));