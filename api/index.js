// Utilizar funcionalidades del Ecmascript 6
'use strict'

// al ser el primer archivo requerido al ejecutar la app, se configuran todas las variables definidas en el (puerto, ...)
require('./config/config');

// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
var mongoose = require('mongoose');

// *Cargamos el fichero app.js con la configuración de Express
var app = require('./app');

const connectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;

// Usamos el método connect para conectarnos a nuestra base de datos
mongoose.connect(process.env.URLDB, connectOptions)
    .then(() => {
        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("La conexión a la base de datos se ha realizado correctamente")

        // CREAR EL SERVIDOR WEB CON NODEJS
        app.listen(process.env.PORT, () => {
            console.log(`Escuchando en puerto ${process.env.PORT}`);
        });
    })
    // Si no se conecta correctamente escupimos el error
    .catch(err => console.log(err));