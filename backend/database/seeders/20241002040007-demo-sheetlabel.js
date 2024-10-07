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
    const owner = await User.findOne({
      where: { username: 'demo' },
      include: [
        {
          model: Sheet,
          where: { name: { [Op.in]: fakeSheets.map(s => s.name) } },
        },
        {
          model: Label,
          where: { name: { [Op.in]: fakeLabels.map(a => a.name) } },
        },
      ],
    });

    const lookup = {
      Strength: '8',
      Cuteness: '5',
      'Hit Points': '42',
      'Max HP': '60',
      'Primary weapon': 'Blunderbuss',
      Unstable: 'false',
    };

    let count = 0;
    const { Sheets, Labels } = owner.dataValues;
    while (count < Math.max(Sheets.length, Labels.length)) {
      const currSheet = Sheets[count % Sheets.length];
      const currLabel = Labels[count % Labels.length];
      await SheetLabel.create({
        sheetId: currSheet.id,
        labelId: currLabel.id,
        value: lookup[currLabel.name],
      });
      count++;
    }
  },

  async down(queryInterface, Sequelize) {
    const { Op } = Sequelize;
    const owner = await User.findOne({
      where: { username: 'demo' },
      include: [
        {
          model: Sheet,
          where: { name: { [Op.in]: fakeSheets.map(s => s.name) } },
        },
        {
          model: Label,
          where: { name: { [Op.in]: fakeLabels.map(a => a.name) } },
        },
      ],
    });

    const { Sheets, Labels } = owner.dataValues;
    const sheetIds = Sheets.filter(s =>
      fakeSheets.some(fs => fs.name === s.name)
    ).map(s => s.id);
    const labelIds = Labels.filter(a =>
      fakeLabels.some(fa => fa.name === a.name)
    ).map(a => a.id);

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
