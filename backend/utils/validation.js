const { validationResult } = require('express-validator');
const { BadRequestError } = require('./errors');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.array().forEach(error => (errors[error.path] = error.msg));

    throw new BadRequestError(errors);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
