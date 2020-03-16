import React, { Component } from 'react';
import AppFrame from './AppFrame';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom'

class NotFoundPage extends Component {
    render() {
        return (
            <AppFrame
                header={'Pagina no encontrada'}
                body={
                    <Row className='not-found-row'>
                        <Link to='/'>
                            <Button color='secondary'>
                                {'Volver a Home'}
                            </Button>
                        </Link>
                    </Row>
                }
            ></AppFrame>
        );
    }
}

export default NotFoundPage;