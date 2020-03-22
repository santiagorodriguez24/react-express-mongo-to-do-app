import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Input, UncontrolledTooltip } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import { renderOptions } from '../utils/utils';

const ActionsBar = props => {
    const { onAdd, filters } = props;

    return (
        <Row className='actions-bar'>
            <Col xs="12" sm='12' md="auto" className='col-actions-bar'>
                <Button className='btn-round' id='add-button' name='add-button' onClick={() => onAdd()}>
                    <FaPlus />
                </Button>
                {/* <UncontrolledTooltip placement="right" target="add-button">
                    {'Add Task'}
                </UncontrolledTooltip> */}
            </Col>
            <Col className='col-actions-bar'>
                <Row className='basic-row'>
                    {
                        filters.map((filter, index) => (
                            <Col xs="12" sm='12' md='6' lg='3' className='filter-col' key={`filter-${index}`}>
                                <Row className='basic-row'>
                                    <Col xs='auto' className='label-col'>
                                        <span>{`${filter.label}`}</span>
                                    </Col>
                                    <Col className='input-col'>
                                        <Input
                                            type={filter.type ? filter.type : "text"}
                                            name={filter.name}
                                            id={`${filter.name}-${index}`}
                                            placeholder={filter.placeholder}
                                            onChange={e => filter.onChange(e, index)}
                                            className='filter-input'
                                        >
                                            {
                                                filter.type === 'select' ?
                                                    renderOptions(filter.options, filter.name)
                                                    :
                                                    null
                                            }
                                        </Input>
                                    </Col>
                                </Row>
                            </Col>
                        )
                        )
                    }
                </Row>
            </Col>
        </Row>
    );
};

ActionsBar.propTypes = {
    onAdd: PropTypes.func,
    filters: PropTypes.array
};

export default ActionsBar;