// reorder the labels in a sheet

const { check } = require('express-validator');
const {
  requireAuth,
  validateRequest,
  successResponse,
} = require('../../../middleware');
const { Sheet, SheetLabel } = require('../../../database/models');
const {
  AuthorizationError,
  NotFoundError,
  BadRequestError,
} = require('../../../utils/errors');
const { formatSheetLabelsMutate } = require('../../../utils/functions');

module.exports = [
  requireAuth,

  check('order')
    .exists()
    .isArray()
    .withMessage('Order must be an array of label IDs.'),

  validateRequest,

  async (req, res, next) => {
    const { sheetId } = req.params;
    const { order } = req.body;

    const sheet = await Sheet.findByPk(sheetId, { include: SheetLabel });
    if (!sheet) throw new NotFoundError('Sheet not found');
    if (sheet.ownerId !== req.user.id) throw new AuthorizationError();

    // check that the order array has the correct elements
    const sortedLabelIds = sheet.SheetLabels.map(
      sl => sl.Label.dataValues.id
    ).sort((a, b) => a - b);
    const sortedOrder = order.slice().sort((a, b) => a - b);

    // if not, return an error
    if (sortedLabelIds.join(',') !== sortedOrder.join(',')) {
      const missingLabelIds = sortedLabelIds.filter(
        id => order.indexOf(id) === -1
      );

      // 400 error for omitted labelIds
      if (missingLabelIds.length)
        throw new BadRequestError(
          { order: { missingLabelIds } },
          'Sheet labels missing.'
        );

      // 404 error for extra labelIds
      const notFoundLabelIds = order.filter(
        id => sortedLabelIds.indexOf(id) === -1
      );
      const err = new NotFoundError('Sheet labels not found.');
      err.errors = { order: { notFoundLabelIds } };
      throw err;
    }

    // change index values of each SheetLabel to reflect order
    let index = 0;
    for (const sheetLabelId of order) {
      const sheetLabel = sheet.SheetLabels.find(
        sl => sl.Label.dataValues.id === sheetLabelId
      );
      if (!sheetLabel) throw new NotFoundError('Sheet label not found');
      await sheetLabel.update({ index });
      index++;
    }

    formatSheetLabelsMutate(sheet.SheetLabels);

    res.message = 'Reordered sheet labels.';
    res.data = { sheet };

    next();
  },

  successResponse,
];
