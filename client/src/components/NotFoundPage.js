import React, { Component } from 'react';
import AppFrame from './AppFrame';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom'

class NotFoundPage extends Component {
    render() {
        return (
            <AppFrame
                header={'Page not Found'}
                body={
                    <Row className='not-found-row'>
                        <Link to='/'>
                            <Button color='secondary'>
                                {'Back to Home'}
                            </Button>
                        </Link>
                    </Row>
                }
            ></AppFrame>
        );
    }
}

export default NotFoundPage;