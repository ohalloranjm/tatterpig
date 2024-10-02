const express = require('express');
const { User, Sheet } = require('../../database/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// view all public sheets
router.get('/', async (_req, res) => {
  const sheets = await Sheet.findAll({ where: { public: true } });
  return res.json({ sheets });
});

// view all sheets owned by the current user
router.get('/current', requireAuth, async (req, res) => {
  const { id: ownerId } = req.user;
  console.log(ownerId);
  const sheets = await Sheet.findAll({ where: { ownerId } });
  return res.json({ sheets });
});

module.exports = router;
