// log in a user

const { check } = require('express-validator');
const { validateRequest } = require('../../../middleware');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie } = require('../../../utils/functions');
const { User } = require('../../../database/models');

module.exports = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),

  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),

  validateRequest,

  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });

    if (
      !user ||
      !bcrypt.compareSync(password, user.hashedPassword.toString())
    ) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = { credential: 'The provided credentials were invalid.' };
      return next(err);
    }

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser,
    });
  },
];
