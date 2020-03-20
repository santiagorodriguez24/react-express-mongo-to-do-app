'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload({ useTempFiles: true }));

app.use(express.static(__dirname + '../client/build/'));

app.use(require('./routes/todoRoutes'));

module.exports = app;