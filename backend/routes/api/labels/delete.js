// delete a label

const { requireAuth } = require('../../../middleware');
const { Label } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');

module.exports = [
  requireAuth,

  async (req, res) => {
    const { labelId } = req.params;
    const label = await Label.findByPk(labelId);

    if (!label) throw new NotFoundError('Label not found');
    if (label.ownerId !== req.user.id) throw new AuthorizationError();

    await label.destroy();

    return res.json({ message: 'Successfully deleted', label });
  },
];
