// sign up as a new user

const { check } = require('express-validator');
const { validateRequest, successResponse } = require('../../../middleware');
const bcrypt = require('bcryptjs');
const { setTokenCookie } = require('../../../utils/functions');
const { User } = require('../../../database/models');

module.exports = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),

  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username must be 4 characters or more.'),

  check('username').not().isEmail().withMessage('Username cannot be an email.'),

  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),

  validateRequest,

  async (req, res, next) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    res.message = 'Created account.';
    res.data = { user: safeUser };

    next();
  },

  successResponse,
];
