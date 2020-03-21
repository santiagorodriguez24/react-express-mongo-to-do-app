import React, { Component } from 'react';
import AppFrame from './AppFrame';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa';

class NotFoundPage extends Component {
    render() {
        return (
            <AppFrame
                header={'Page not Found'}
                body={
                    <div className='not-found-image' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/recalculating.jpg)` }}>
                        <Row className='not-found-row'>
                            <Button
                                color=''
                                className='edit'
                                block
                                size="lg"
                                tag={Link}
                                to={'/'}
                            >
                                <FaHome style={{ marginRight: '15px' }} />
                                {'Back to Home'}
                            </Button>
                        </Row>
                    </div>
                }
            ></AppFrame>
        );
    }
}

export default NotFoundPage;