// create a new label

const { requireAuth, successResponse } = require('../../../middleware');

module.exports = [
  requireAuth,

  async (req, res, next) => {
    const { user, body } = req;
    const { name, dataType } = body;

    const label = await user.createLabel({ name, dataType });

    res.message = 'Created label.';
    res.data = { label };

    next();
  },

  successResponse,
];
