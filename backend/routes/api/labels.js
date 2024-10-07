const express = require('express');
const { Label, Sheet, SheetLabel } = require('../../database/models');
const { requireAuth } = require('../../utils/auth');
const { AuthorizationError, NotFoundError } = require('../../utils/errors');
const { formatLabelSheetsMutate } = require('../../utils/response-formatting');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// view all labels owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  const { id: ownerId } = req.user;
  const labels = await Label.findAll({
    where: { ownerId },
    include: SheetLabel.scope('reversed'),
  });

  for (const label of labels) {
    formatLabelSheetsMutate(label.SheetLabels);
  }

  return res.json({ labels });
});

// view the details of a specific label
router.get('/:labelId', requireAuth, async (req, res) => {
  const { labelId } = req.params;
  const label = await Label.findByPk(labelId, {
    include: SheetLabel.scope('reversed'),
  });

  if (!label) throw new NotFoundError('Label not found');
  if (label.ownerId !== req.user.id) throw new AuthorizationError();

  formatLabelSheetsMutate(label.SheetLabels);

  return res.json({ label });
});

const validateUpdateLabel = [
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

// update an label
router.put('/:labelId', requireAuth, validateUpdateLabel, async (req, res) => {
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
});

// delete an label
router.delete('/:labelId', requireAuth, async (req, res) => {
  const { labelId } = req.params;
  const label = await Label.findByPk(labelId);

  if (!label) throw new NotFoundError('Label not found');
  if (label.ownerId !== req.user.id) throw new AuthorizationError();

  await label.destroy();

  return res.json({ message: 'Successfully deleted', label });
});

// create a new label
router.post('/', requireAuth, async (req, res) => {
  const { user, body } = req;
  const { name, dataType } = body;

  const label = await user.createLabel({ name, dataType });

  res.status(201);

  return res.json({ message: 'Successfully created label', label });
});

module.exports = router;
