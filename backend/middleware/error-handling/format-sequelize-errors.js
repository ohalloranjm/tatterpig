// catch and format Sequelize errors

const { ValidationError } = require('sequelize');
const { BadRequestError } = require('../../utils/errors');

module.exports = {
  name: 'formatSequelizeErrors',
  middle(err, _req, _res, next) {
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      throw new BadRequestError(errors, 'Model validation failed.');
    }
    return next(err);
  },
};
