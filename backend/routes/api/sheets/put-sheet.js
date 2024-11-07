// update a sheet

const { requireAuth, validateRequest } = require('../../../middleware');
const { check } = require('express-validator');
const { Sheet } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');

module.exports = [
  requireAuth,

  check('name').exists().withMessage('Name is required'),

  check('description').exists().withMessage('Description is required'),

  check('public').exists().withMessage('Public is required'),

  validateRequest,

  async (req, res) => {
    const { sheetId } = req.params;
    const sheet = await Sheet.findByPk(sheetId);

    if (!sheet) throw new NotFoundError('Sheet not found');
    if (sheet.ownerId !== req.user.id) throw new AuthorizationError();

    const { name, description, public } = req.body;

    const updated = await sheet.update({ name, description, public });
    return res.json({ sheet: updated });
  },
];
