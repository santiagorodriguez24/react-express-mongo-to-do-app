import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from './AppHeader';

const AppFrame = props => {
    const { header, body } = props;
    return (
        <div className="app-frame">
            <AppHeader title={header}></AppHeader>
            {body}
        </div>
    );
};

AppFrame.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired, // elemento de react renderizable
};

export default AppFrame;