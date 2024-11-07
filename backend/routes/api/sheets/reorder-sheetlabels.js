// reorder the labels in a sheet

const { requireAuth } = require('../../../middleware');
const { Sheet, SheetLabel } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');

module.exports = [
  requireAuth,

  async (req, res) => {
    const { sheetId } = req.params;
    const { order } = req.body;

    const sheet = await Sheet.findByPk(sheetId, { include: SheetLabel });
    if (!sheet) throw new NotFoundError('Sheet not found');
    if (sheet.ownerId !== req.user.id) throw new AuthorizationError();

    let index = 0;
    for (const sheetLabelId of order) {
      const sheetLabel = sheet.SheetLabels.find(
        sl => sl.Label.dataValues.id === sheetLabelId
      );
      if (!sheetLabel) throw new NotFoundError('Sheet label not found');
      await sheetLabel.update({ index });
      index++;
    }

    return res.json({ message: 'Success', sheet });
  },
];
