// view the details of a specific sheet

const { Sheet, SheetLabel } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');
const { formatSheetLabelsMutate } = require('../../../utils/functions');

module.exports = async (req, res) => {
  const { sheetId } = req.params;
  const sheet = await Sheet.findByPk(sheetId, { include: SheetLabel });

  if (!sheet) throw new NotFoundError('Sheet not found');

  const authorized = sheet.public || req.user?.id === sheet.ownerId;
  if (!authorized) throw new AuthorizationError();

  formatSheetLabelsMutate(sheet.SheetLabels);

  return res.json({ sheet });
};
