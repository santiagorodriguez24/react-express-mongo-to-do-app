import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { isEmpty } from 'lodash';

class NewTodoContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: {}
        }
    }

    handleSubmit = (event) => {
        let descripcion = event.target.description.value;
        let archivo = event.target.file.files[0];

        const formData = new FormData()
        formData.append("descripcion", descripcion);

        if (archivo) {
            formData.append("archivo", archivo);
        }

        console.log('On submit formdata: ', formData);

        fetch("/todo", {
            mode: 'no-cors',
            method: "POST",
            body: formData
        }).then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    return Promise.reject(responseJson.validation)
                }

                return responseJson;
            })
            .then(result => {
                console.log("Se resolvio con exito: ", result)
                this.setState({
                    result
                })
            })
            .catch(error => {
                console.log("Hubo un error: ", error);
            });
    }

    render() {
        return (

            <Container>

                <Row>
                    <Form
                        encType="multipart/form-data"
                        onSubmit={e => {
                            e.preventDefault();
                            this.handleSubmit(e);
                        }}
                        method="post"
                    // name="fileinfo"
                    >
                        <FormGroup>
                            <Label for="description">Descripcion</Label>
                            <Input
                                type="textarea"
                                name="description"
                                id="description"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleFile">Archivo</Label>
                            <Input
                                type="file"
                                name="file"
                                id="exampleFile"
                            />
                            <FormText color="muted">
                                This is some placeholder block-level help text for the above input.
                                It's a bit lighter and easily wraps to a new line.
        </FormText>
                        </FormGroup>
                        <Button
                            type='submit'
                        >
                            {'Submit'}
                        </Button>
                    </Form>
                </Row>
                {
                    isEmpty(this.state.result) ?
                        null
                        :
                        <Row>
                            <Col>
                                <img src={this.state.result.todo.archivo} />
                            </Col>
                        </Row>
                }
            </Container>

        );
    }
}

export default NewTodoContainer;