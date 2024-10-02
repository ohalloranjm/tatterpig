'use strict';

const { User, Sheet, Attribute, SheetAttribute } = require('../models');
const { fakeSheets } = require('./20241002025726-demo-sheet');
const { fakeAttributes } = require('./20241002033609-demo-attribute');

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
          model: Attribute,
          where: { name: { [Op.in]: fakeAttributes.map(a => a.name) } },
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
    const { Sheets, Attributes } = owner.dataValues;
    while (count < Math.max(Sheets.length, Attributes.length)) {
      const currSheet = Sheets[count % Sheets.length];
      const currAttribute = Attributes[count % Attributes.length];
      await SheetAttribute.create({
        sheetId: currSheet.id,
        attributeId: currAttribute.id,
        value: lookup[currAttribute.name],
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
          model: Attribute,
          where: { name: { [Op.in]: fakeAttributes.map(a => a.name) } },
        },
      ],
    });

    const { Sheets, Attributes } = owner.dataValues;
    const sheetIds = Sheets.filter(s =>
      fakeSheets.some(fs => fs.name === s.name)
    ).map(s => s.id);
    const attributeIds = Attributes.filter(a =>
      fakeAttributes.some(fa => fa.name === a.name)
    ).map(a => a.id);

    const toDelete = await SheetAttribute.findAll({
      where: {
        [Op.and]: [
          { sheetId: { [Op.in]: sheetIds } },
          { attributeId: { [Op.in]: attributeIds } },
        ],
      },
    });

    for (const datum of toDelete) {
      await datum.destroy();
    }
  },
};
