import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { setPropsToInitialValues } from '../HOCs/setPropsToInitialValues';
import { Prompt } from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormText, FormFeedback, Button, Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { stateOptions } from '../constants/options';
import { renderOptions } from '../utils/utils';
import { FaFileUpload, FaTimes } from 'react-icons/fa';

const validate = values => {
    const error = {};

    if (!values.title) {
        error.title = 'The title field is required.'
    }

    if (!values.description) {
        error.description = 'The description field is required.'
    }

    if (!values.state) {
        error.state = 'You must select a state.'
    }

    return error;
};

export class ToDoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showFileLink: props.isAdd ? false : props.file ? true : false,
            savedFile: props.file
        }

    }

    componentDidMount() {
        if (this.txt) {
            this.txt.focus();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.file !== prevState.savedFile) {
            return {
                showFileLink: nextProps.isAdd ? false : nextProps.file ? true : false,
                savedFile: nextProps.file
            };
        }

        return null;
    }

    renderMyField = ({ input, meta, type, label, name, withFocus, placeholder }) => (
        <div>
            <FormGroup>
                <Label for={name}>{label}</Label>
                <Input
                    {...input}
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
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded, id, file, isAdd } = this.props;

        return (
            <Card className='todo-form'>
                <CardHeader >
                    {isAdd ? 'Create Task' : `Edit Task: ${id}`}
                </CardHeader>

                <CardBody>
                    <Form encType="multipart/form-data">
                        <Field
                            label="Title*"
                            name="title"
                            placeholder="Enter a title for the task."
                            component={this.renderMyField}
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
                                onClick={handleSubmit}
                                type='submit'
                                disabled={pristine || submitting}
                            >
                                {'Save'}
                            </Button>
                        </Col>
                        <Col xs='12' sm='6' md='4' className='button-col'>
                            <Button
                                color="" className='back' block
                                type='button'
                                onClick={onBack}
                                disabled={submitting}
                            >
                                {'Cancel'}
                            </Button>
                        </Col>
                    </Row>
                </CardFooter>

            </Card>
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

// The name of our form passed to the HOC redux Form must be unique throughout the app.
// We use a HOC that maps properties to initialValues.
export default setPropsToInitialValues(reduxForm({ form: 'ToDoForm', validate })(ToDoForm));