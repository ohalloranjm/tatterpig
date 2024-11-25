// log out the current user

const { successResponse } = require('../../../middleware');

module.exports = [
  (_req, res, next) => {
    res.clearCookie('token');
    res.message = 'Logged out.';
    next();
  },

  successResponse,
];
