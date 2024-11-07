// update a label

const { check } = require('express-validator');
const { requireAuth, validateRequest } = require('../../../middleware');
const { Label, SheetLabel } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');

module.exports = [
  requireAuth,

  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Name is required'),

  check('dataType')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Data type is required'),

  validateRequest,

  async (req, res) => {
    const { labelId } = req.params;
    const label = await Label.findByPk(labelId, {
      include: SheetLabel.scope('reversed'),
    });

    if (!label) throw new NotFoundError('Label not found');
    if (label.ownerId !== req.user.id) throw new AuthorizationError();

    const { name, dataType } = req.body;

    let removeValues = false;
    if (dataType !== label.dataType) removeValues = true;

    const updated = await label.update({ name, dataType });

    if (removeValues) {
      for (const sheetLabel of updated.SheetLabels) {
        await sheetLabel.update({ value: null });
      }
    }

    return res.json({ message: 'Success', label: updated });
  },
];
