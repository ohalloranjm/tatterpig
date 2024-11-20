// if there is no current user, return an error

module.exports = {
  name: 'requireAuth',
  middle(req, _res, next) {
    if (req.user) return next();

    const err = new Error('You must be logged in to access this resource.');
    err.title = 'Authentication Required';
    err.status = 401;
    return next(err);
  },
};
