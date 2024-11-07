// associate a label with a sheet

const { requireAuth } = require('../../../middleware');
const { Sheet, SheetLabel, Label } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');
const { validateLabelValue } = require('../../../utils/functions');

module.exports = [
  requireAuth,

  async (req, res) => {
    const { sheetId } = req.params;
    const { labelId } = req.body;

    const label = await Label.findByPk(labelId);
    if (!label) throw new NotFoundError('Label not found');
    if (label.ownerId !== req.user.id) throw new AuthorizationError();

    const sheet = await Sheet.findByPk(sheetId, { include: SheetLabel });
    if (!sheet) throw new NotFoundError('Sheet not found');
    if (sheet.ownerId !== req.user.id) throw new AuthorizationError();

    let { value } = req.body;
    if ('value' in req.body) {
      value = validateLabelValue(value, label);
    }

    const index =
      1 +
      sheet.SheetLabels.reduce(
        (max, sl) => Math.max(max, sl.dataValues.index),
        -1
      );

    const sheetLabel = await sheet.createSheetLabel({ labelId, value, index });

    res.status(201);
    return res.json({ message: 'Success', sheetLabel });
  },
];
