import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form'; // importamos el HOC que conecta el formulario con redux-form.
import { setPropsToInitialValues } from '../HOCs/setPropsToInitialValues';
import { Prompt } from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormText, FormFeedback, Button } from 'reactstrap';

const validate = values => {
    const error = {}; // objeto con los errores de validacion encontrados. El nombre de las claves es igual al campo con error

    if (!values.titulo) {
        error.titulo = 'Debe ingresar un Titulo.'
    }

    if (!values.description) {
        error.description = 'Debe ingresar una Descripcion.'
    }

    if (!values.estado) {
        error.estado = 'Debe seleccionar un Estado.'
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
                        this.renderOptions(options, name)
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

    renderOptions = (options, name) => {
        let result = options.map((option, index) => {
            return (
                <option key={`${name}-${index}`} value={option}>
                    {option}
                </option>
            );
        }
        );
        result.unshift(<option key={0} value={''}></option>);
        return result;
    };

    render() {
        // es importante que la funcion pasada a onSubmit se llame handleSubmit ya que es una funcion provista por redux-form
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props;

        return (
            <Form
                encType="multipart/form-data"
                method="post"
                onSubmit={handleSubmit}
                style={{ color: 'white' }}
            >
                {/* El componente Field es el que genera acciones e impacta en el reducer de redux - form */}
                <Field
                    withFocus={true}
                    label="Titulo*"
                    name="titulo"
                    placeholder="Escriba un titulo para la tarea"
                    component={this.renderMyField} // para poder mostrar la validacion no puedo usar un input comun
                />

                <Field
                    label="Descripcion*"
                    type="textarea"
                    name="description"
                    placeholder="Agregue una descripcion a la tarea"
                    component={this.renderMyField} // para poder mostrar la validacion no puedo usar un input comun
                />

                <Field
                    label="Estado*"
                    name="estado"
                    options={['PENDIENTE', 'RESUELTO']}
                    placeholder="Seleccione el estado"
                    component={this.renderSelectField} // para poder mostrar la validacion no puedo usar un input comun
                />

                <Field
                    type="file"
                    name="archivo"
                    label="Archivo"
                    helpText={"Puede seleccionar un archivo adjunto a la tarea."}
                    component={this.renderFileInput} // para poder mostrar la validacion no puedo usar un input comun
                />

                <FormGroup>
                    <Button
                        color="secondary"
                        type='submit'
                        disabled={pristine || submitting}
                        style={{ marginRight: '20px' }}
                    >
                        {'Enviar'}
                    </Button>
                    <Button
                        color="secondary"
                        outline
                        type='button' // Si no le ponemos el type button por defecto se ejecuta como submit
                        onClick={onBack}
                        disabled={submitting}
                    >
                        {'Cancelar'}
                    </Button>
                </FormGroup>

                <Prompt
                    when={!pristine && !submitSucceeded}
                    message="Se perderan los datos ingresados si continua"
                >
                </Prompt>
            </Form>
        );
    }
}

ToDoForm.propTypes = {
    titulo: PropTypes.string,
    description: PropTypes.string,
    estado: PropTypes.string,
    archivo: PropTypes.string,
    onBack: PropTypes.func.isRequired
};

// el nombre de nuestro formulario pasado al HOC reduxForm debe ser unico en toda la app
// Utilizamos un HOC que mapea las propiedades a initialValues
export default setPropsToInitialValues(reduxForm({ form: 'ToDoForm', validate })(ToDoForm));