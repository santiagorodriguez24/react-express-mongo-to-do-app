import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form'; // importamos el HOC que conecta el formulario con redux-form.
import { setPropsToInitialValues } from '../HOCs/setPropsToInitialValues';
import { Prompt } from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormText, FormFeedback, Button } from 'reactstrap';
import { stateOptions } from '../constants/options';
import { renderOptions } from '../utils/utils';

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

    renderFileInput = ({ input: { value: omitValue, onChange, onBlur, ...inputProps }, meta: omitMeta, label, name, helpText }) => (
        <div>
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
                <FormText color="muted">
                    {helpText}
                </FormText>
            </FormGroup>
        </div>
    );

    handleChange = (handler) => e => handler(e.target.files[0]);

    // handleChange = (handler) => ({ target: { files } }) => handler(files.length ? files[0] : null);

    render() {
        // es importante que la funcion pasada a onSubmit se llame handleSubmit ya que es una funcion provista por redux-form
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props;

        return (
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

                <Field
                    label="File"
                    name="file"
                    helpText={"You can attach a file to the task."}
                    component={this.renderFileInput}
                />

                <FormGroup>
                    <Button
                        color="secondary"
                        type='submit'
                        disabled={pristine || submitting}
                        style={{ marginRight: '20px' }}
                    >
                        {'Submit'}
                    </Button>
                    <Button
                        color="secondary"
                        outline
                        type='button' // Si no le ponemos el type button por defecto se ejecuta como submit
                        onClick={onBack}
                        disabled={submitting}
                    >
                        {'Cancel'}
                    </Button>
                </FormGroup>

                <Prompt
                    when={!pristine && !submitSucceeded}
                    message="The data entered will be lost if you continue."
                >
                </Prompt>
            </Form>
        );
    }
}

ToDoForm.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.string,
    file: PropTypes.string,
    onBack: PropTypes.func.isRequired
};

// el nombre de nuestro formulario pasado al HOC reduxForm debe ser unico en toda la app
// Utilizamos un HOC que mapea las propiedades a initialValues
export default setPropsToInitialValues(reduxForm({ form: 'ToDoForm', validate })(ToDoForm));