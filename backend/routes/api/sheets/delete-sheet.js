// delete a sheet

const { requireAuth, successResponse } = require('../../../middleware');
const { Sheet } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');

module.exports = [
  requireAuth,

  async (req, res, next) => {
    const { sheetId } = req.params;
    const sheet = await Sheet.findByPk(sheetId);

    if (!sheet) throw new NotFoundError('Sheet not found');
    if (sheet.ownerId !== req.user.id) throw new AuthorizationError();

    await sheet.destroy();

    res.message = 'Deleted sheet.';
    res.data = { sheet };

    next();
  },

  successResponse,
];
