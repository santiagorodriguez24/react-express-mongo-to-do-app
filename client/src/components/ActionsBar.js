import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Input, UncontrolledTooltip } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import { renderOptions } from '../utils/utils';

const ActionsBar = props => {
    const { onAdd, filters } = props;

    return (
        <Row className='actions-bar'>
            <Col xs="auto" className='col-header'>
                <Button className='btn-round' id='add-button' onClick={() => onAdd()}>
                    <FaPlus />
                </Button>
            </Col>
            <UncontrolledTooltip placement="right" target="add-button">
                {'Add Task'}
            </UncontrolledTooltip>
            {
                filters.map((filter, index) => {
                    if (filter.type === 'select') {
                        return (
                            <Col xs="auto" className='col-header' key={`filter-${index}`}>
                                <span>{`${filter.label}`}</span>
                                <Input
                                    type={'select'}
                                    name={filter.name}
                                    id={`${filter.name}-${index}`}
                                    placeholder={filter.placeholder}
                                    onChange={e => filter.onChange(e, index)}
                                    className='filter-input'
                                >
                                    {
                                        renderOptions(filter.options, filter.name)
                                    }
                                </Input>
                            </Col>
                        );
                    } else {
                        return (
                            <Col xs="auto" className='col-header' key={`filter-${index}`}>
                                <span>{`${filter.label}`}</span>
                                <Input
                                    type={filter.type ? filter.type : "text"}
                                    name={filter.name}
                                    id={`${filter.name}-${index}`}
                                    placeholder={filter.placeholder}
                                    onChange={e => filter.onChange(e, index)}
                                    className='filter-input'
                                />
                            </Col>
                        );
                    }
                }
                )
            }
        </Row>
    );
};

ActionsBar.propTypes = {
    onAdd: PropTypes.func,
    filters: PropTypes.array
};

export default ActionsBar;