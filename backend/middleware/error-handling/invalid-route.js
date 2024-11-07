// catch unhandled requests and forward to error handler

const { NotFoundError } = require('../../utils/errors');

module.exports = {
  name: 'invalidRoute',

  middle(_req, _res, next) {
    const err = new NotFoundError("The requested resource couldn't be found.");
    return next(err);
  },
};
