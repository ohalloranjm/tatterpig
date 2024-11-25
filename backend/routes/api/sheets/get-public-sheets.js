// view all public sheets

const { Sheet } = require('../../../database/models');
const { successResponse } = require('../../../middleware');

module.exports = [
  async (_req, res, next) => {
    const sheets = await Sheet.findAll({ where: { public: true } });

    res.message = 'Retrieved sheets.';
    res.data = { sheets };

    next();
  },

  successResponse,
];
