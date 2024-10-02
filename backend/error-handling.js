const { ValidationError } = require('sequelize');
const { NotFoundError } = require('./utils/errors');

const { environment } = require('./config');
const isProduction = environment === 'production';

const handleErrors = [];

// catch unhandled requests and forward to error handler
handleErrors.push(() => {
  throw new NotFoundError("The requested resource couldn't be found.");
});

// catch and format sequelize errors
handleErrors.push((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation Error';
    err.errors = errors;
    err.status = 400;
  }
  next(err);
});

// error format
handleErrors.push((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = handleErrors;
