const express = require('express');
const { Attribute, Sheet, SheetAttribute } = require('../../database/models');
const { requireAuth } = require('../../utils/auth');
const { AuthorizationError, NotFoundError } = require('../../utils/errors');
const {
  formatAttributeSheetsMutate,
} = require('../../utils/response-formatting');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// view all attributes owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  const { id: ownerId } = req.user;
  const attributes = await Attribute.findAll({ where: { ownerId } });
  return res.json({ attributes });
});

// view the details of a specific attribute
router.get('/:attributeId', requireAuth, async (req, res) => {
  const { attributeId } = req.params;
  const attribute = await Attribute.findByPk(attributeId, {
    include: SheetAttribute.scope('reversed'),
  });

  if (!attribute) throw new NotFoundError('Attribute not found');
  if (attribute.ownerId !== req.user.id) throw new AuthorizationError();

  formatAttributeSheetsMutate(attribute.SheetAttributes);

  return res.json({ attribute });
});

const validateUpdateAttribute = [
  check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Name is required'),
  check('dataType')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Data type is required'),
  handleValidationErrors,
];

// update an attribute
router.put(
  '/:attributeId',
  requireAuth,
  validateUpdateAttribute,
  async (req, res) => {
    const { attributeId } = req.params;
    const attribute = await Attribute.findByPk(attributeId, {
      include: SheetAttribute.scope('reversed'),
    });

    if (!attribute) throw new NotFoundError('Attribute not found');
    if (attribute.ownerId !== req.user.id) throw new AuthorizationError();

    const { name, dataType } = req.body;

    let removeValues = false;
    if (dataType !== attribute.dataType) removeValues = true;

    const updated = await attribute.update({ name, dataType });

    if (removeValues) {
      for (const sheetAttribute of updated.SheetAttributes) {
        await sheetAttribute.update({ value: null });
      }
    }

    return res.json({ message: 'Success', attribute: updated });
  }
);

// delete an attribute
router.delete('/:attributeId', requireAuth, async (req, res) => {
  const { attributeId } = req.params;
  const attribute = await Attribute.findByPk(attributeId);

  if (!attribute) throw new NotFoundError('Attribute not found');
  if (attribute.ownerId !== req.user.id) throw new AuthorizationError();

  await attribute.destroy();

  return res.json({ message: 'Successfully deleted', attribute });
});

// create a new attribute
router.post('/', requireAuth, async (req, res) => {
  const { user, body } = req;
  const { name, dataType } = body;

  const attribute = await user.createAttribute({ name, dataType });

  res.status(201);

  return res.json({ message: 'Successfully created attribute', attribute });
});

module.exports = router;
