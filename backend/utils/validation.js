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

const validateAttributeValue = (value, { dataType }) => {
  if (value !== null) value = String(value);
  switch (dataType) {
    case 'number':
      if (isNaN(value))
        throw new BadRequestError({ value: 'Value must be a number' });
      break;
    case 'boolean':
      if (!['true', 'false'].includes(value?.toLowerCase())) {
        throw new BadRequestError({ value: 'Value must be true or false' });
      }
      value = value.toLowerCase();
  }
  return value;
};

module.exports = {
  handleValidationErrors,
  validateAttributeValue,
};
