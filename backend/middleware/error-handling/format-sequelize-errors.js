// catch and format Sequelize errors

const { ValidationError } = require('sequelize');

module.exports = {
  name: 'formatSequelizeErrors',
  middle(err, _req, _res, next) {
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
      }
      err.title = 'Validation Error';
      err.errors = errors;
      err.status = 400;
    }
    return next(err);
  },
};
