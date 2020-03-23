import React, { Component } from 'react';
import AppFrame from '../components/AppFrame';
import { Card, CardHeader, CardBody, Button, Row } from 'reactstrap';
import { FaTasks } from 'react-icons/fa';
import { ROUTE_TODOS } from '../constants/routes';

class HomeContainer extends Component {

    handleOnClick = () => {
        this.props.history.push(ROUTE_TODOS);
    }

    render() {
        return (
            <AppFrame
                header={'Home'}
                body={
                    <div className="home-container">
                        <div className="background img1" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/to-do-image-1.jpg)` }}></div>
                        <div className="background img2" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/to-do-image-2.jpg)` }}></div>
                        <div className="background img3" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/to-do-image-3.jpg)` }}></div>
                        <div className="welcome-action">
                            <Row>
                                <Card>
                                    <CardHeader>
                                        <span>Welcome to the To Do App!</span>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="lead">
                                            {'Work and workflow visualization tool that enables you to manage work at personal or organizational level, limit work-in-progress, and maximize efficiency. '}
                                        </p>
                                    </CardBody>
                                </Card>
                            </Row>
                            <Row className='button-container'>
                                <Button
                                    color=""
                                    className="edit"
                                    size="lg"
                                    block
                                    onClick={this.handleOnClick}
                                >
                                    <FaTasks style={{ marginRight: '15px' }} />
                                    {'Go to the task list'}
                                </Button>
                            </Row>
                        </div>
                    </div>
                }
            />
        );
    }
}

export default HomeContainer;