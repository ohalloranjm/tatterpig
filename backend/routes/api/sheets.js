const express = require('express');
const { Sheet, SheetAttribute } = require('../../database/models');
const { requireAuth } = require('../../utils/auth');
const { AuthorizationError, NotFoundError } = require('../../utils/errors');
const {
  formatSheetAttributesMutate,
} = require('../../utils/response-formatting');

const router = express.Router();

// view all sheets owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  const { id: ownerId } = req.user;
  console.log(ownerId);
  const sheets = await Sheet.findAll({ where: { ownerId } });
  return res.json({ sheets });
});

// view the details of a specific sheet
router.get('/:sheetId', async (req, res) => {
  const { sheetId } = req.params;
  const sheet = await Sheet.findByPk(sheetId, { include: SheetAttribute });

  if (!sheet) throw new NotFoundError('Sheet not found');

  const authorized = sheet.public || req.user?.id === sheet.ownerId;
  if (!authorized) throw new AuthorizationError();

  formatSheetAttributesMutate(sheet.SheetAttributes);

  return res.json({ sheet });
});

// delete a sheet
router.delete('/:sheetId', requireAuth, async (req, res) => {
  const { sheetId } = req.params;
  const sheet = await Sheet.findByPk(sheetId);

  if (!sheet) throw new NotFoundError('Sheet not found');
  if (sheet.ownerId !== req.user.id) throw new AuthorizationError();

  await sheet.destroy();

  return res.json({ message: 'Successfully deleted', sheet });
});

// view all public sheets
router.get('/', async (_req, res) => {
  const sheets = await Sheet.findAll({ where: { public: true } });
  return res.json({ sheets });
});

// create a new sheet
router.post('/', requireAuth, async (req, res) => {
  const { user, body } = req;
  const { name, public, description } = body;

  const sheet = await user.createSheet({ name, public, description });

  res.status = 201;

  return res.json({ message: 'Successfully created sheet', sheet });
});

module.exports = router;
