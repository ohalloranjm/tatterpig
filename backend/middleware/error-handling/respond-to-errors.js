// format and respond to errors

const { environment } = require('../../config');
const isProduction = environment === 'production';

module.exports = {
  name: 'respondToErrors',

  middle(err, _req, res, _next) {
    res.status(err.status || 500);
    return res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack,
    });
  },
};
