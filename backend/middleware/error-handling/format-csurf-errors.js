// catch and format csurf errors

module.exports = {
  name: 'formatCsurfErrors',

  middle(err, _req, _next, next) {
    if (err.message === 'invalid csrf token') {
      err.title = 'Authentication Failed';
      err.message = 'Invalid CSRF token.';
      err.status = 401;
    }
    next(err);
  },
};
