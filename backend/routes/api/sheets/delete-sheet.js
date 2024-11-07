// delete a sheet

const { requireAuth } = require('../../../middleware');
const { Sheet } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');

module.exports = [
  requireAuth,

  async (req, res) => {
    const { sheetId } = req.params;
    const sheet = await Sheet.findByPk(sheetId);

    if (!sheet) throw new NotFoundError('Sheet not found');
    if (sheet.ownerId !== req.user.id) throw new AuthorizationError();

    await sheet.destroy();

    return res.json({ message: 'Successfully deleted', sheet });
  },
];
