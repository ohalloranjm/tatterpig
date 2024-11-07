// view all public sheets

const { Sheet } = require('../../../database/models');

module.exports = async (_req, res) => {
  const sheets = await Sheet.findAll({ where: { public: true } });
  return res.json({ sheets });
};
