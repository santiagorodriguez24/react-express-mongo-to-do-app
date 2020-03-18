import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaUndo } from 'react-icons/fa';

const ToDoView = props => {
    const { _id, title, description, state, file, onBack, onEdit, onDelete } = props;
    
    return (
        <Container fluid>
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
                    <Button color="" className='edit' size="lg" block onClick={() => onEdit(_id)}>
                        <FaEdit style={{ marginRight: '10px' }} />
                        {'Edit'}
                    </Button>
                    <Button color="" className='delete' size="lg" block onClick={() => onDelete(_id)}>
                        <FaTrashAlt style={{ marginRight: '10px' }} />
                        {'Delete'}
                    </Button>
                    <Button color="" className='back' size="lg" block onClick={onBack}>
                        <FaUndo style={{ marginRight: '10px' }} />
                        {'Back'}
                    </Button>
                </CardFooter>
            </Card>
        </Container>
    );
};

ToDoView.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    file: PropTypes.string,
    onBack: PropTypes.func.isRequired,
    isDeleteAllow: PropTypes.bool,
    onDelete: PropTypes.func
};

export default ToDoView;