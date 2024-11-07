// delete the current user's account

const { requireAuth } = require('../../../middleware');

module.exports = [
  requireAuth,

  async (req, res) => {
    await req.user.destroy();
    res.clearCookie('token');
    delete req.user.dataValues.hashedPassword;
    return res.json({
      message: 'Successfully deleted account',
      user: req.user,
    });
  },
];
