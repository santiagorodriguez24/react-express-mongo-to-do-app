'use strict'

let notFoundHandler = (req, res, next) => {

    // respond with html page
    if (req.accepts('html')) {
        res.set('Content-Type', 'text/html');
        return res.status(404).send('<h1>404 - Not found.</h1>');
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