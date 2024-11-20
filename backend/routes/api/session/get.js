// view the current user's details

const { successResponse } = require('../../../middleware');

module.exports = [
  (req, res, next) => {
    const { user } = req;
    res.message = 'Retrieved session details.';

    if (user) {
      const { id, email, username } = user;
      res.data = { user: { id, email, username } };
    } else {
      res.data = { user: null };
    }

    next();
  },

  successResponse,
];
