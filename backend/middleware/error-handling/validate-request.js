// format errors from express-validator middleware

const { validationResult } = require('express-validator');
const { BadRequestError } = require('../../utils/errors');

module.exports = {
  name: 'validateRequest',

  middle(req, _res, next) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = {};
      validationErrors
        .array()
        .forEach(error => (errors[error.path] = error.msg));

      throw new BadRequestError(errors);
    }
    next();
  },
};
