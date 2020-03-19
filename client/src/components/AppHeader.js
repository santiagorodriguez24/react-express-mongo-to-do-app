import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

const AppHeader = props => {
    return (
        <Container fluid>
            <Row className="app-header">
                <Col xs="auto" className='col-header'>
                    <img
                        src={process.env.PUBLIC_URL + '/images/to-do-icon.png'}
                        alt="To Do-Logo"
                        className='todo-logo'
                    />
                </Col>
                <Col xs="auto" className='col-header'>
                    <h1 style={{ margin: '0px' }}>{props.title}</h1>
                </Col>
            </Row>
        </Container>
    );
};

AppHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default AppHeader;