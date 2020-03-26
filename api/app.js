'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
const path = require('path');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload({ useTempFiles: true }));

app.use(express.static(path.join(__dirname, '../client/build/')));

app.disable("x-powered-by");

app.use(require('./routes/todoRoutes'));

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;