import React from 'react';

export const renderOptions = (options, name) => {
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