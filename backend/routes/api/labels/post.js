// create a new label

const { requireAuth } = require('../../../middleware');

module.exports = [
  requireAuth,

  async (req, res) => {
    const { user, body } = req;
    const { name, dataType } = body;

    const label = await user.createLabel({ name, dataType });

    res.status(201);

    return res.json({ message: 'Successfully created label', label });
  },
];
