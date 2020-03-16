/*
High order component:
Es una funcion que actua como un decorator, es decir que agrega funcionalidad a un componente sin modificar el componente original
*/

import React, { Component } from "react";

export const setPropsToInitialValues = WrappedComponent => (

    class extends Component {

        render() {
            /* por defecto redux-form solo toma las propiedades de initialValues UNA VEZ, si se recarga la pagina No volvera a leerlos
            y pasarselos a los campos del formulario, aunque estos valores hayan cambiado*/
            return (
                <WrappedComponent
                    {...this.props}
                    initialValues={this.props}
                    enableReinitialize // esta propiedad permite tomar varias veces los valores de initialValues
                />
            );
        }
    }
);