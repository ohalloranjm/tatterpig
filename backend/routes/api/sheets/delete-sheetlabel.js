// disassociate a label from a sheet

const { requireAuth, successResponse } = require('../../../middleware');
const { Sheet, SheetLabel, Label } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');

module.exports = [
  requireAuth,

  async (req, res, next) => {
    const { sheetId, labelId } = req.params;
    const sheetLabel = await SheetLabel.findOne({
      where: { sheetId, labelId },
      include: [Sheet, Label],
    });

    if (!sheetLabel) throw new NotFoundError('Sheet label not found.');
    if (sheetLabel.Sheet.ownerId !== req.user.id) {
      throw new AuthorizationError();
    }

    await sheetLabel.destroy();

    res.message = 'Deleted sheet label.';
    res.data = { sheetLabel };

    next();
  },

  successResponse,
];
