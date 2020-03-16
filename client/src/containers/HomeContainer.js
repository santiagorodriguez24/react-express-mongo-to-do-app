import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import { Jumbotron, Container, Row, Button } from 'reactstrap';

class HomeContainer extends Component {

    handleOnClick = () => {
        // siempre que nuestro componente este dentro del componente Router puedo acceder history
        this.props.history.push('/todos');
    }

    render() {
        return (
            <AppFrame
                header={'Home'}
                body={
                    <div className='home-container'>
                        <Jumbotron fluid>
                            <Container fluid>
                                <h1 className="display-5">Bienvenido a la To Do App</h1>
                                <p className="lead">Podra crear y editar tareas pendientes y modificar su estado a Resuelto.</p>
                                <hr className="my-4" />
                                <Row>
                                    <Button color="secondary" size="lg" block onClick={this.handleOnClick}>Lista de Tareas</Button>
                                </Row>
                            </Container>
                        </Jumbotron>
                    </div>
                }
            />
        );
    }
}

/* el decorator withRouter agrega funcionalidad a este componente, permite que acceda a history, location y match 
sin importar la forma en que el componente fue invocado (si su renderizacion es el resultado de una funcion sin esto no anda).
*/
export default withRouter(HomeContainer);