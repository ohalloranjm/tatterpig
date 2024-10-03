const express = require('express');
const { Attribute, Sheet, SheetAttribute } = require('../../database/models');
const { requireAuth } = require('../../utils/auth');
const { AuthorizationError, NotFoundError } = require('../../utils/errors');
const {
  formatAttributeSheetsMutate,
} = require('../../utils/response-formatting');

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
    include: { model: SheetAttribute, include: Sheet },
  });

  if (!attribute) throw new NotFoundError('Attribute not found');
  if (attribute.ownerId !== req.user.id) throw new AuthorizationError();

  formatAttributeSheetsMutate(attribute.SheetAttributes);

  return res.json({ attribute });
});

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
