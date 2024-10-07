const express = require('express');
const { Sheet, SheetAttribute, Attribute } = require('../../database/models');
const { requireAuth } = require('../../utils/auth');
const { AuthorizationError, NotFoundError } = require('../../utils/errors');
const {
  formatSheetAttributesMutate,
} = require('../../utils/response-formatting');
const { check } = require('express-validator');
const {
  handleValidationErrors,
  validateAttributeValue,
} = require('../../utils/validation');

const router = express.Router();

// view all sheets owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  const { id: ownerId } = req.user;
  const sheets = await Sheet.findAll({
    where: { ownerId },
    include: SheetAttribute,
  });

  for (const sheet of sheets) {
    formatSheetAttributesMutate(sheet.SheetAttributes);
  }

  return res.json({ sheets });
});

const validateUpdateSheetAttribute = [
  check('value').exists().withMessage('Value is required'),
  handleValidationErrors,
];

// change the value of a SheetAttribute instance
router.put(
  '/:sheetId/attributes/:attributeId',
  requireAuth,
  validateUpdateSheetAttribute,
  async (req, res) => {
    const { sheetId, attributeId } = req.params;
    let { value } = req.body;

    const sheetAttribute = await SheetAttribute.findOne({
      where: { sheetId, attributeId },
      include: [Sheet, Attribute],
    });

    if (!sheetAttribute) throw new NotFoundError();
    if (sheetAttribute.Sheet.ownerId !== req.user.id) {
      throw new AuthorizationError();
    }

    value = validateAttributeValue(value, sheetAttribute.Attribute);

    await sheetAttribute.update({ value });

    return res.json({ message: 'Success', sheetAttribute });
  }
);

// disassociate an attribute from a sheet
router.delete(
  '/:sheetId/attributes/:attributeId',
  requireAuth,
  async (req, res) => {
    const { sheetId, attributeId } = req.params;
    const sheetAttribute = await SheetAttribute.findOne({
      where: { sheetId, attributeId },
      include: [Sheet, Attribute],
    });

    if (!sheetAttribute) throw new NotFoundError();
    if (sheetAttribute.Sheet.ownerId !== req.user.id) {
      throw new AuthorizationError();
    }

    await sheetAttribute.destroy();
    return res.json({ message: 'Successfully deleted', sheetAttribute });
  }
);

// associate an attribute with a sheet
router.post('/:sheetId/attributes', requireAuth, async (req, res) => {
  const { sheetId } = req.params;
  const { attributeId } = req.body;

  const attribute = await Attribute.findByPk(attributeId);
  if (!attribute) throw new NotFoundError('Attribute not found');
  if (attribute.ownerId !== req.user.id) throw new AuthorizationError();

  const sheet = await Sheet.findByPk(sheetId);
  if (!sheet) throw new NotFoundError('Sheet not found');
  if (sheet.ownerId !== req.user.id) throw new AuthorizationError();

  let { value } = req.body;
  if ('value' in req.body) {
    value = validateAttributeValue(value, attribute);
  }

  const sheetAttribute = await sheet.createSheetAttribute({
    attributeId,
    value,
  });

  res.status(201);
  return res.json({ message: 'Success', sheetAttribute });
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

const validateUpdateSheet = [
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Name is required'),
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
