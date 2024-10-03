const express = require('express');
const { Attribute } = require('../../database/models');
const { requireAuth } = require('../../utils/auth');
const { AuthorizationError, NotFoundError } = require('../../utils/errors');

const router = express.Router();

// view all attributes owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  const { id: ownerId } = req.user;
  const attributes = await Attribute.findAll({ where: { ownerId } });
  return res.json({ attributes });
});

module.exports = router;
