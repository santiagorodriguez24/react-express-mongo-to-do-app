import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form'; // importamos el HOC que conecta el formulario con redux-form.
import { setPropsToInitialValues } from '../HOCs/setPropsToInitialValues';
import { Prompt } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, FormText, FormFeedback, Button, Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { stateOptions } from '../constants/options';
import { renderOptions } from '../utils/utils';
import { FaFileUpload, FaTimes } from 'react-icons/fa';

const validate = values => {
    const error = {}; // objeto con los errores de validacion encontrados. El nombre de las claves es igual al campo con error

    if (!values.title) {
        error.title = 'The title field is required.'
    }

    if (!values.description) {
        error.description = 'The description field is required.'
    }

    if (!values.state) {
        error.state = 'You must select a state.'
    }

    return error; // si no hay error se retorna un objeto vacio
};

export class ToDoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showFileLink: props.isAdd ? false : props.file ? true : false
        }

        console.log('constructor props: ', props);
        console.log('constructor state: ', this.state);
    }

    componentDidMount() {
        if (this.txt) {
            this.txt.focus();
        }
    }

    renderMyField = ({ input, meta, type, label, name, withFocus, placeholder }) => (
        <div>
            <FormGroup>
                <Label for={name}>{label}</Label>
                <Input
                    {...input} // le pasamos todas las propiedades el input original
                    id={name}
                    placeholder={placeholder}
                    type={type ? type : "text"}
                    innerRef={withFocus && (txt => this.txt = txt)}
                    invalid={meta.touched && meta.error}
                />
            </FormGroup>
            {
                meta.touched && meta.error ?
                    <FormFeedback style={{ display: 'block', fontSize: '100%' }}>{meta.error}</FormFeedback>
                    :
                    null
            }
        </div>
    );

    renderSelectField = ({ input, meta, options, label, name, placeholder }) => (
        <div>
            <FormGroup>
                <Label for={name}>{label}</Label>
                <Input
                    {...input}
                    id={name}
                    placeholder={placeholder}
                    type={"select"}
                    invalid={meta.touched && meta.error}
                >
                    {
                        renderOptions(options, name)
                    }
                </Input>
            </FormGroup>
            {
                meta.touched && meta.error ?
                    <FormFeedback style={{ display: 'block', fontSize: '100%' }}>{meta.error}</FormFeedback>
                    :
                    null
            }
        </div>
    );

    renderFileInput = ({ input: { value: omitValue, onChange, onBlur, ...inputProps }, meta, label, name, helpText, cancelable }) => {

        return (
            <FormGroup>
                <Label for={name}>{label}</Label>
                <Input
                    type="file"
                    name={name}
                    id={name}
                    {...inputProps}
                    onChange={this.handleChange(onChange)}
                    onBlur={this.handleChange(onBlur)}
                />

                {
                    cancelable && !meta.dirty ?
                        <Row className='form-link'>
                            <Col xs='auto'>
                                <FormText>
                                    {helpText}
                                </FormText>
                            </Col>
                            <Col xs='auto'>
                                <Button color="" className='delete' onClick={() => this.handleFileLink()}>
                                    <FaTimes style={{ marginRight: '10px' }} /> {'Cancel Change File'}
                                </Button>
                            </Col>
                        </Row>
                        :
                        <FormText>
                            {helpText}
                        </FormText>
                }

            </FormGroup>
        );
    }

    handleChange = (handler) => e => handler(e.target.files[0]);

    handleFileLink = () => {
        this.setState({
            showFileLink: !this.state.showFileLink
        });
    }

    render() {
        // es importante que la funcion pasada a onSubmit se llame handleSubmit ya que es una funcion provista por redux-form
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded, id, file, isAdd } = this.props;

        return (
            <Container fluid className='todo-form'>
                <Card>
                    <CardHeader >
                        {isAdd ? 'Create Task' : `Edit Task: ${id}`}
                    </CardHeader>

                    <CardBody>
                        <Form
                            encType="multipart/form-data"
                            method="post"
                            onSubmit={handleSubmit}
                        >
                            {/* El componente Field es el que genera acciones e impacta en el reducer de redux - form */}
                            <Field
                                label="Title*"
                                name="title"
                                placeholder="Enter a title for the task."
                                component={this.renderMyField} // para poder mostrar la validacion no puedo usar un input comun
                                withFocus={true}
                            />

                            <Field
                                label="Description*"
                                name="description"
                                type="textarea"
                                placeholder="Add a description to the task."
                                component={this.renderMyField}
                            />

                            <Field
                                label="State*"
                                name="state"
                                options={stateOptions}
                                placeholder="Select a state for the task."
                                component={this.renderSelectField}
                            />

                            {
                                isAdd || !file ?
                                    <Field
                                        label="File"
                                        name="file"
                                        helpText={"You can attach a file to the task."}
                                        component={this.renderFileInput}
                                    />
                                    :
                                    this.state.showFileLink ?
                                        <Row className='form-link'>
                                            <Col xs='auto'>
                                                <span>File: </span>&nbsp;&nbsp;
                                                <a href={`/${file}`} target="_blank" rel="noopener noreferrer">{file ? file.replace("uploads/", "") : ""}</a>
                                            </Col>
                                            <Col xs='auto'>
                                                <Button color="" className='delete' style={{ marginLeft: '10px' }} onClick={() => this.handleFileLink()}>
                                                    <FaFileUpload style={{ marginRight: '10px' }} /> {'Change File'}
                                                </Button>
                                            </Col>
                                        </Row>
                                        :
                                        <Field
                                            label="File"
                                            name="file"
                                            helpText={"You can change the file attached to this task.."}
                                            cancelable={true}
                                            component={this.renderFileInput}
                                        />
                            }

                            <Prompt
                                when={!pristine && !submitSucceeded}
                                message="The data entered will be lost if you continue."
                            >
                            </Prompt>
                        </Form>
                    </CardBody>

                    <CardFooter>
                        <Row className='basic-row'>
                            <Col xs='12' sm='6' md='4' className='button-col'>
                                <Button
                                    color="" className='edit' block
                                    type='submit'
                                    disabled={pristine || submitting}
                                >
                                    {'Save'}
                                </Button>
                            </Col>
                            <Col xs='12' sm='6' md='4' className='button-col'>
                                <Button
                                    color="" className='back' block
                                    type='button' // Si no le ponemos el type button por defecto se ejecuta como submit
                                    onClick={onBack}
                                    disabled={submitting}
                                >
                                    {'Cancel'}
                                </Button>
                            </Col>
                        </Row>
                    </CardFooter>

                </Card>
            </Container>
        );
    }
}

ToDoForm.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.string,
    file: PropTypes.string,
    onBack: PropTypes.func.isRequired,
    isAdd: PropTypes.bool
};

// el nombre de nuestro formulario pasado al HOC reduxForm debe ser unico en toda la app
// Utilizamos un HOC que mapea las propiedades a initialValues
export default setPropsToInitialValues(reduxForm({ form: 'ToDoForm', validate })(ToDoForm));