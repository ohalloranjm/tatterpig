// create a new sheet

const { requireAuth, successResponse } = require('../../../middleware');

module.exports = [
  requireAuth,

  async (req, res, next) => {
    const { user, body } = req;
    const { name, public, description } = body;

    const sheet = await user.createSheet({ name, public, description });

    res.message = 'Created sheet.';
    res.data = { sheet };

    next();
  },

  successResponse,
];
