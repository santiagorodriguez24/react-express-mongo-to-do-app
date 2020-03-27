'use strict'

const path = require('path');

let notFoundHandler = (req, res, next) => {

    // respond with html page
    if (req.accepts('html')) {
        res.set('Content-Type', 'text/html');
        return res.sendFile(path.join(__dirname + '../../../client/build/not-found.html'));
    }

    // respond with json
    if (req.accepts('json')) {
        const error = new Error("Not found.");
        error.status = 404;
        next(error);
        return;
    }

    // default plain-text
    return res.status(404).type('txt').send('Not found');
}

let errorHandler = (error, req, res, next) => {

    res.status(error.status || 500).json({
        ok: false,
        error: error.message || 'Internal Server Error.'
    })

}

module.exports = {
    notFoundHandler,
    errorHandler
}