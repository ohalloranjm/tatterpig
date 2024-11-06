const { NotFoundError } = require('../../utils/errors');

// catch unhandled requests and forward to error handler
module.exports = {
  name: 'invalidRoute',

  middle(_req, _res, next) {
    const err = new NotFoundError("The requested resource couldn't be found.");
    return next(err);
  },
};
