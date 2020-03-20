import React, { Component } from "react";

/*
By default redux-form only takes the initialValues prop ONCE,
if the page is reloaded it will not read them again even if they have changed and will not pass them to the form fields either.
*/

export const setPropsToInitialValues = WrappedComponent => (
    class extends Component {

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    initialValues={this.props}
                    enableReinitialize // This property allows the initialValues values to be taken multiple times.
                />
            );
        }
    }
);