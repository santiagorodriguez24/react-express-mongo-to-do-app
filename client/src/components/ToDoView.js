import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Card, CardHeader, CardBody, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaUndo } from 'react-icons/fa';

const ToDoView = props => {
    const { id, title, description, state, file, onBack, onEdit, onDelete } = props;

    const [modalOpen, setModalOpen] = useState(false);

    const toggle = () => setModalOpen(!modalOpen);

    return (
        <Fragment>
            <Card className='todo-view'>
                <CardHeader>
                    {title}
                </CardHeader>
                <CardBody>
                    <div><strong>Description: </strong><i>{description}</i></div>
                    <div><strong>State: </strong><i>{state}</i></div>
                    <div>
                        <strong>File: </strong>
                        <a href={`/${file}`} target="_blank" rel="noopener noreferrer">{file ? file.replace("uploads/", "") : ""}</a>
                    </div>
                </CardBody>
                <CardFooter>
                    <Button color="" className='edit' size="lg" block onClick={() => onEdit(id)}>
                        <FaEdit style={{ marginRight: '15px' }} />
                        {'Edit'}
                    </Button>
                    <Button color="" className='delete' size="lg" block onClick={toggle}>
                        <FaTrashAlt style={{ marginRight: '15px' }} />
                        {'Delete'}
                    </Button>
                    <Button color="" className='back' size="lg" block onClick={onBack}>
                        <FaUndo style={{ marginRight: '15px' }} />
                        {'Back'}
                    </Button>
                </CardFooter>
            </Card>
            <Modal isOpen={modalOpen} toggle={toggle} centered={true} className='message-modal'>
                <ModalHeader toggle={toggle}>{'Delete Task'}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="auto">
                            <img
                                src={process.env.PUBLIC_URL + '/images/desfibradora.png'}
                                alt="Delete Icon"
                                className='todo-logo'
                            />
                        </Col>
                        <Col xs="auto">
                            <div className="lead">{`Are you sure you want to delete this task?`}</div>
                            <div>{`You won't be able to revert this!`}</div>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Row className='basic-row'>
                        <Col xs='6'>
                            <Button color="" block className='delete' onClick={() => onDelete(id)}>Delete</Button>
                        </Col>
                        <Col xs='6'>
                            <Button color="" block className='back' onClick={toggle}>Cancel</Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

ToDoView.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    file: PropTypes.string,
    onBack: PropTypes.func.isRequired,
    isDeleteAllow: PropTypes.bool,
    onDelete: PropTypes.func
};

export default ToDoView;