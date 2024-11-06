const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../../config');
const { secret } = jwtConfig;
const { User } = require('../../database/models');

// parse the request JWT
// if valid, set req.user to the User model instance
// if invalid or missing, req.user = null

module.exports = {
  name: 'restoreUser',

  middle(req, res, next) {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        return next();
      }

      try {
        const { id } = jwtPayload.data;
        req.user = await User.findByPk(id, {
          labels: {
            include: ['email', 'createdAt', 'updatedAt'],
          },
        });
      } catch (e) {
        res.clearCookie('token');
        return next();
      }

      if (!req.user) res.clearCookie('token');

      return next();
    });
  },
};
