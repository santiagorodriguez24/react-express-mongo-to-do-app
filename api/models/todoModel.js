const mongoose = require('mongoose');

let estadosValidos = {
    values: ['PENDIENTE', 'RESUELTO'],
    message: '{VALUE} no es un estado valido.' // mensaje que se muestra si el VALUE no se incluye en el arreglo values
}

/*
Los modelos representan documentos que se pueden guardar y recuperar de nuestra base de datos.
Los modelos se definen utilizando la interfaz Schema. El esquema le permite definir los campos almacenados en cada documento 
junto con sus requisitos de validación y valores predeterminados.
*/
let Schema = mongoose.Schema;

// configuro una coleccion de usuarios
let todoSchema = new Schema(
    // defino los campos que tendra un objeto user de la coleccion y sus reglas: el tipo y si es requerido o no
    {
        titulo: {
            type: String,
            required: [true, 'La descripcion es requerida.']
        },
        descripcion: {
            type: String,
            required: [true, 'La descripcion es requerida.']
        },
        estado: {
            type: String,
            default: 'PENDIENTE',
            enum: estadosValidos // el valor de role tiene que ser uno de los definidos en el arreglo values de rolesValidos
        },
        archivo: {
            type: String,
            required: false // se puede omitir el required cuando es false. 
            /* Al definirlo como no requerido, cuando el campo img no es pasado con la peticion no causa un error, 
            y si ademas no tiene definido un valor por defecto el objeto user resultante no tendra la propiedad img.
            */
        }
    }
);

module.exports = mongoose.model('todo', todoSchema);