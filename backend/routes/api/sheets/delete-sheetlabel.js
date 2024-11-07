// disassociate a label from a sheet

const { requireAuth } = require('../../../middleware');
const { Sheet, SheetLabel, Label } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');

module.exports = [
  requireAuth,

  async (req, res) => {
    const { sheetId, labelId } = req.params;
    const sheetLabel = await SheetLabel.findOne({
      where: { sheetId, labelId },
      include: [Sheet, Label],
    });

    if (!sheetLabel) throw new NotFoundError();
    if (sheetLabel.Sheet.ownerId !== req.user.id) {
      throw new AuthorizationError();
    }

    await sheetLabel.destroy();
    return res.json({ message: 'Successfully deleted', sheetLabel });
  },
];
