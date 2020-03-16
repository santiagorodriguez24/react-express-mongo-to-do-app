// Utilizar funcionalidades del Ecmascript 6
'use strict'

// Cargamos los módulos de express y body-parser
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

// Llamamos a express para poder crear el servidor
const app = express();

/* Mediante app.use() defino middlewares, los cuales son funciones que se ejecutan cada vez que una peticion que llega al server y antes de que la misma llegue a un controlador */
// Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Analiza las peticiones multipart/form-data, extrae los archivos si están disponibles y 
los pone a disposición en la propiedad req.files. */
app.use(fileUpload({ useTempFiles: true }));

app.use(express.static(__dirname + '../client/build/'));

// Cargamos las rutas
app.use(require('./routes/todoRoutes'));

// exportamos este módulo para poder usar la variable app fuera de este archivo
module.exports = app;