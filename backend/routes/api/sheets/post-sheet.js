// create a new sheet

const { requireAuth } = require('../../../middleware');

module.exports = [
  requireAuth,

  async (req, res) => {
    const { user, body } = req;
    const { name, public, description } = body;

    const sheet = await user.createSheet({ name, public, description });

    res.status(201);

    return res.json({ message: 'Successfully created sheet', sheet });
  },
];
