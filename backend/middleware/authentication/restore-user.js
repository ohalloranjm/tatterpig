// parse the request JWT and set req.user

const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../../config');
const { secret } = jwtConfig;
const { User } = require('../../database/models');

module.exports = {
  name: 'restoreUser',

  middle(req, res, next) {
    const { token } = req.cookies;

    // if JWT is invalid or missing, req.user = null
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        return next();
      }

      try {
        const { id } = jwtPayload.data;

        // if valid, req.user = the User model instance
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
