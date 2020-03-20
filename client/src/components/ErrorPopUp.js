import React, { useState } from 'react';
import { Row, Col, Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { Link } from "react-router-dom";

const ErrorPopUp = props => {
    const [modalOpen, setModalOpen] = useState(true);

    const toggle = () => setModalOpen(!modalOpen);

    return (
        <Modal
            isOpen={modalOpen} toggle={toggle} centered={true}
            className='message-modal'
        >
            <ModalHeader>
                {'Something has not gone as it should'}
            </ModalHeader>
            <ModalBody>
                <Row className='basic-row'>
                    <Col xs='3'>
                        <img
                            src={process.env.PUBLIC_URL + '/images/to-do-icon.png'}
                            alt="To Do-Logo"
                            className='todo-logo'
                        />
                    </Col>
                    <Col>
                        <div>
                            {props.message}
                        </div>
                        <div>
                            {'Try reloading the page.'}
                        </div>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Row className='basic-row'>
                    <Col xs='6'>
                        <Button
                            color="" block className='delete'
                            onClick={() => props.reloadPage()}
                        >
                            {'Reload'}
                        </Button>
                    </Col>
                    <Col xs='6'>
                        <Button
                            color="" block className='back'
                            to={'/'}
                            tag={Link}
                            onClick={() => {
                                if (props.removeErrorProp) {
                                    props.removeErrorProp({ error: '' });
                                }
                            }
                            }
                        >
                            {'Back to Home'}
                        </Button>
                    </Col>
                </Row>
            </ModalFooter>
        </Modal>
    );
}

export default ErrorPopUp;
