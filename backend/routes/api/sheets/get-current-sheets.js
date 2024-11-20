// view all sheets owned by the current user

const { requireAuth, successResponse } = require('../../../middleware');
const { Sheet, SheetLabel } = require('../../../database/models');
const { formatSheetLabelsMutate } = require('../../../utils/functions');

module.exports = [
  requireAuth,

  async (req, res, next) => {
    const { id: ownerId } = req.user;
    const sheets = await Sheet.findAll({
      where: { ownerId },
      include: SheetLabel,
    });

    for (const sheet of sheets) {
      formatSheetLabelsMutate(sheet.SheetLabels);
    }

    res.message = 'Retrieved sheets.';
    res.data = { sheets };

    next();
  },

  successResponse,
];
