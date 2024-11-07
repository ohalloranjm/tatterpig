// view all labels owned by the current user

const { requireAuth } = require('../../../middleware');
const { Label, SheetLabel } = require('../../../database/models');
const { formatLabelSheetsMutate } = require('../../../utils/functions');

module.exports = [
  requireAuth,

  async (req, res) => {
    const { id: ownerId } = req.user;
    const labels = await Label.findAll({
      where: { ownerId },
      include: SheetLabel.scope('reversed'),
    });

    for (const label of labels) {
      formatLabelSheetsMutate(label.SheetLabels);
    }

    return res.json({ labels });
  },
];
