import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap'

const MessageActions = props => {
    const { children } = props;
    return (
        <Row className="message-actions">
            <Col xs={12}>
                {children}
            </Col>
        </Row>
    );
};

MessageActions.propTypes = {
    children: PropTypes.node.isRequired // todo tipo de elemento renderizable por react
};

export default MessageActions;