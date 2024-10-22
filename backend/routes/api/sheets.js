const express = require('express');
const { Sheet, SheetLabel, Label } = require('../../database/models');
const { requireAuth } = require('../../utils/auth');
const { AuthorizationError, NotFoundError } = require('../../utils/errors');
const { formatSheetLabelsMutate } = require('../../utils/response-formatting');
const { check } = require('express-validator');
const {
  handleValidationErrors,
  validateLabelValue,
} = require('../../utils/validation');

const router = express.Router();

// view all sheets owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  const { id: ownerId } = req.user;
  const sheets = await Sheet.findAll({
    where: { ownerId },
    include: SheetLabel,
  });

  for (const sheet of sheets) {
    formatSheetLabelsMutate(sheet.SheetLabels);
  }

  return res.json({ sheets });
});

const validateUpdateSheetLabel = [
  check('value').exists().withMessage('Value is required'),
  handleValidationErrors,
];

// change the value of a SheetLabel instance
router.put(
  '/:sheetId/labels/:labelId',
  requireAuth,
  validateUpdateSheetLabel,
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
  }
);

// disassociate an label from a sheet
router.delete('/:sheetId/labels/:labelId', requireAuth, async (req, res) => {
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
});

// associate a label with a sheet
router.post('/:sheetId/labels', requireAuth, async (req, res) => {
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
});

// reorder the labels
router.put('/:sheetId/labels', requireAuth, async (req, res) => {
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
});

// view the details of a specific sheet
router.get('/:sheetId', async (req, res) => {
  const { sheetId } = req.params;
  const sheet = await Sheet.findByPk(sheetId, { include: SheetLabel });

  if (!sheet) throw new NotFoundError('Sheet not found');

  const authorized = sheet.public || req.user?.id === sheet.ownerId;
  if (!authorized) throw new AuthorizationError();

  formatSheetLabelsMutate(sheet.SheetLabels);

  return res.json({ sheet });
});

const validateUpdateSheet = [
  check('name').exists().withMessage('Name is required'),
  check('description').exists().withMessage('Description is required'),
  check('public').exists().withMessage('Public is required'),
  handleValidationErrors,
];

// update a sheet
router.put('/:sheetId', requireAuth, validateUpdateSheet, async (req, res) => {
  const { sheetId } = req.params;
  const sheet = await Sheet.findByPk(sheetId);

  if (!sheet) throw new NotFoundError('Sheet not found');
  if (sheet.ownerId !== req.user.id) throw new AuthorizationError();

  const { name, description, public } = req.body;

  const updated = await sheet.update({ name, description, public });
  return res.json({ sheet: updated });
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

  res.status(201);

  return res.json({ message: 'Successfully created sheet', sheet });
});

module.exports = router;
