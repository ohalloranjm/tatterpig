// change the value of a SheetLabel instance

const { check } = require('express-validator');
const { requireAuth, validateRequest } = require('../../../middleware');
const { Sheet, SheetLabel, Label } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');
const { validateLabelValue } = require('../../../utils/functions');

module.exports = [
  requireAuth,

  check('value').exists().withMessage('Value is required'),

  validateRequest,

  async (req, res) => {
    const { sheetId, labelId } = req.params;
    let { value } = req.body;

    const sheetLabel = await SheetLabel.findOne({
      where: { sheetId, labelId },
      include: [Sheet, Label],
    });

    if (!sheetLabel) throw new NotFoundError();
    if (sheetLabel.Sheet.ownerId !== req.user.id) {
      throw new AuthorizationError();
    }

    value = validateLabelValue(value, sheetLabel.Label);

    await sheetLabel.update({ value });

    return res.json({ message: 'Success', sheetLabel });
  },
];
