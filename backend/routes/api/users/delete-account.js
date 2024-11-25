// delete the current user's account

const { requireAuth, successResponse } = require('../../../middleware');

module.exports = [
  requireAuth,

  async (req, res, next) => {
    await req.user.destroy();
    res.clearCookie('token');

    res.message = 'Deleted account.';

    const { id, username, email } = req.user;
    res.data = { user: { id, username, email } };

    next();
  },

  successResponse,
];
