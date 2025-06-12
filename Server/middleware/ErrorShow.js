const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err.code === 11000) {
        const message = `this ${Object.keys(err.keyValue)} is alredy exist`;
        err = new ErrorHandler(message, 400);

    }
    res.status(err.statusCode).json({ sucess: false, statusCode: err.statusCode, message: err.message })
};