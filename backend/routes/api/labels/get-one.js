// view the details of a specific label

const { requireAuth } = require('../../../middleware');
const { Label, SheetLabel } = require('../../../database/models');
const { AuthorizationError, NotFoundError } = require('../../../utils/errors');
const { formatLabelSheetsMutate } = require('../../../utils/functions');

module.exports = [
  requireAuth,

  async (req, res) => {
    const { labelId } = req.params;
    const label = await Label.findByPk(labelId, {
      include: SheetLabel.scope('reversed'),
    });

    if (!label) throw new NotFoundError('Label not found');
    if (label.ownerId !== req.user.id) throw new AuthorizationError();

    formatLabelSheetsMutate(label.SheetLabels);

    return res.json({ label });
  },
];
