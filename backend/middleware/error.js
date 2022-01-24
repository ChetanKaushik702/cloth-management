const ErrorHandler = require('../utils/errorHandler');

const handler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server error!!';

    // wrong JWT error
    if (err.name === 'JsonWebTokenError') {
        const message = `Json web token is invalid. Try again.`;
        err = new ErrorHandler(message, 400);
    }

    // JWT expired error
    if (err.name === 'TokenExpiredError') {
        const message = `Token has been expired. Try again.`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

module.exports = handler;