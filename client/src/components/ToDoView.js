import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap';

const ToDoView = props => {
    const { id, titulo, descripcion, estado, archivo, onBack, isDeleteAllow, onDelete } = props;
    return (
        <div className='todo-view'>
            <Jumbotron fluid>
                <Container fluid>
                    <h1 className="display-5">Datos del To Do: </h1>
                    <div><strong>Titulo: </strong><i>{titulo}</i></div>
                    <div><strong>Descripcion: </strong><i>{descripcion}</i></div>
                    <div><strong>Estado: </strong><i>{estado}</i></div>
                    <div><strong>Archivo: </strong><i>{archivo}</i></div>
                    <hr className="my-4" />
                    <Row>
                        <Col>
                            <Button color="secondary" size="lg" block onClick={onBack}>Volver</Button>
                        </Col>
                        {
                            isDeleteAllow ?
                                <Col>
                                    <Button color="danger" size="lg" block onClick={() => onDelete(id)}>Eliminar</Button>
                                </Col>
                                :
                                null
                        }
                    </Row>
                </Container>
            </Jumbotron>
        </div>
    );
};

ToDoView.propTypes = {
    id: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    archivo: PropTypes.string,
    onBack: PropTypes.func.isRequired,
    isDeleteAllow: PropTypes.bool,
    onDelete: PropTypes.func
};

export default ToDoView;