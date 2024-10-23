'use strict';

const { User, Sheet, Label, SheetLabel } = require('../models');
const { fakeSheets } = require('./20241002025726-demo-sheet');
const { fakeLabels } = require('./20241002033609-demo-label');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(_queryInterface, Sequelize) {
    const { Op } = Sequelize;
    const owner = await User.findOne({ where: { username: 'tomorrowind' } });
    const ownerId = owner.id;

    let i = 0;
    for (const sheetDetails of fakeSheets) {
      const { name } = sheetDetails;
      const sheet = await Sheet.findOne({ where: { ownerId, name } });
      const sheetId = sheet.id;
      let index = 0;
      if (fakeLabels[i]) {
        for (const labelDetails of fakeLabels[i]) {
          const { name } = labelDetails;
          const label = await Label.findOne({ where: { ownerId, name } });
          const labelId = label.id;
          await SheetLabel.create({ sheetId, labelId, index });
          index++;
        }
      }
      i++;
    }

    const lookup = {
      Strength: '8',
      Cuteness: '5',
      'Hit Points': '42',
      'Max HP': '60',
      'Primary weapon': 'Blunderbuss',
      Unstable: 'false',
    };
  },

  async down(queryInterface, Sequelize) {
    const { Op } = Sequelize;
    const owner = await User.findOne({
      where: { username: 'tomorrowind' },
      include: [Sheet, Label],
    });

    const { Sheets, Labels } = owner.dataValues;
    const sheetIds = Sheets.map(s => s.id);
    const labelIds = Labels.map(a => a.id);

    const toDelete = await SheetLabel.findAll({
      where: {
        [Op.and]: [
          { sheetId: { [Op.in]: sheetIds } },
          { labelId: { [Op.in]: labelIds } },
        ],
      },
    });

    for (const datum of toDelete) {
      await datum.destroy();
    }
  },
};
