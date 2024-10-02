'use strict';

const { User, Sheet } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const fakeSheets = [
  {
    name: 'Dan Bloodaxe',
    description: "Dan is fightin' man.",
  },
  {
    name: 'Space Wizard Template',
    public: true,
    description:
      'Blank character sheet for the very real game Space Wizards in Space.',
  },
  {
    name: 'Friggilish Fyrewind',
  },
];

module.exports = {
  async up(_queryInterface, _Sequelize) {
    const owner = await User.findOne({ where: { username: 'demo' } });
    const ownerId = owner.id;
    const finalSheets = fakeSheets.map(s => ({ ...s, ownerId }));
    await Sheet.bulkCreate(finalSheets, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Sheets';
    const owner = await User.findOne({ where: { username: 'demo' } });
    const ownerId = owner.id;
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: fakeSheets.reduce((arr, u) => [...arr, u.name], []),
        },
        ownerId,
      },
      {}
    );
  },

  fakeSheets,
};
