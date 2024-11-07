// view all sheets owned by the current user

const { requireAuth } = require('../../../middleware');
const { Sheet, SheetLabel } = require('../../../database/models');
const { formatSheetLabelsMutate } = require('../../../utils/functions');

module.exports = [
  requireAuth,

  async (req, res) => {
    const { id: ownerId } = req.user;
    const sheets = await Sheet.findAll({
      where: { ownerId },
      include: SheetLabel,
    });

    for (const sheet of sheets) {
      formatSheetLabelsMutate(sheet.SheetLabels);
    }

    return res.json({ sheets });
  },
];
