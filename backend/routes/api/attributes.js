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
  console.log('hitting it');
  const { attributeId } = req.params;
  const attribute = await Attribute.findByPk(attributeId, {
    include: { model: SheetAttribute, include: Sheet },
  });

  if (!attribute) throw new NotFoundError('Attribute not found');
  if (attribute.ownerId !== req.user.id) throw new AuthorizationError();

  formatAttributeSheetsMutate(attribute.SheetAttributes);

  return res.json({ attribute });
});

module.exports = router;
