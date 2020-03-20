'use strict'
require('./config/config');
var mongoose = require('mongoose');
var app = require('./app');

const connectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.Promise = global.Promise;

mongoose.connect(process.env.URLDB, connectOptions)
    .then(() => {
        console.log("The connection to the database was successful.")

        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}.`);
        });
    })
    .catch(error => console.log('The connection to the database failed.', error));