import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import { Container, Row, Col, Card, CardHeader, CardBody, ListGroup, ListGroupItem, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTodos } from '../store/actions/fetchTodosAction';
import { getTodos } from '../store/selectors/todoSelectors';
import { FaPlus } from 'react-icons/fa';

class TodoListContainer extends Component {
    constructor() {
        super();
        this.state = {

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

    render() {
        console.log('Render TodoListContainer todos: ', this.props.todos)

        return (
            <AppFrame
                header={'Lista de Tareas'}
                body={
                    <Container fluid>
                        <Row>
                            <Col>
                                <Button className='btn-round' onClick={() => this.handleAddNew()}>
                                    <FaPlus />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <CardHeader>
                                        {'Tareas Pendientes'}
                                    </CardHeader>
                                    <CardBody>
                                        <ListGroup>
                                            <ListGroupItem color="success">Cras justo odio</ListGroupItem>
                                            <ListGroupItem color="info">Dapibus ac facilisis in</ListGroupItem>
                                            <ListGroupItem color="warning">Morbi leo risus</ListGroupItem>
                                            <ListGroupItem color="danger">Porta ac consectetur ac</ListGroupItem>
                                        </ListGroup>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Card>
                                    <CardHeader>
                                        {'Tareas Resueltas'}
                                    </CardHeader>
                                    <CardBody>
                                        <ListGroup>
                                            <ListGroupItem color="success">Cras justo odio</ListGroupItem>
                                            <ListGroupItem color="info">Dapibus ac facilisis in</ListGroupItem>
                                            <ListGroupItem color="warning">Morbi leo risus</ListGroupItem>
                                            <ListGroupItem color="danger">Porta ac consectetur ac</ListGroupItem>
                                        </ListGroup>
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
};

TodoListContainer.defaultProps = {
    todos: []
};

const mapStateToProps = state => ({
    todos: getTodos(state)
});

const mapDispatchToProps = {
    fetchTodos
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoListContainer));