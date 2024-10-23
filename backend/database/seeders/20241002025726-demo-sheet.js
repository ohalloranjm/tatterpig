'use strict';

const { User, Sheet } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const fakeSheets = [
  {
    name: '5e Template',
    public: true,
    description: 'Partial template for D&D 5th edition.',
  },
  {
    name: 'Monster of the Week Template',
    public: true,
    description: 'Blank character sheet for Monster of the Week.',
  },
  {
    name: 'Lasers and Feelings Template',
    public: true,
    description: 'Blank character sheet for the game Lasers and Feelings.',
  },
  {
    name: 'Trick or Treat Template',
    public: true,
    description:
      'Trick or Treat is a L&F-based one-page RPG about Halloween monsters pretending to be costumed humans.',
  },
];

const demoSheets = [
  {
    name: 'Dan Bloodaxe',
    description: "Dan is fightin' man.",
    public: true,
  },
  {
    name: 'Space Wizard Template',
    description:
      'Blank character sheet for the very real game Space Wizards in Space.',
  },
  {
    name: 'Friggilish Fyrewind',
  },
];

module.exports = {
  async up(_queryInterface, _Sequelize) {
    const owner = await User.findOne({ where: { username: 'tomorrowind' } });
    const ownerId = owner.id;
    const finalSheets = fakeSheets.map(s => ({ ...s, ownerId }));
    await Sheet.bulkCreate(finalSheets, { validate: true });

    const demoUser = await User.findOne({ where: { username: 'demo' } });
    const finalDemoSheets = demoSheets.map(s => ({
      ...s,
      ownerId: demoUser.id,
    }));
    await Sheet.bulkCreate(finalDemoSheets, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Sheets';
    const owner = await User.findOne({ where: { username: 'tomorrowind' } });
    const ownerId = owner.id;
    const demoUser = await User.findOne({ where: { username: 'demo' } });

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: fakeSheets.reduce((arr, u) => [...arr, u.name], []),
        },
        ownerId,
      },
      {}
    );

    await queryInterface.bulkDelete(options, { ownerId: demoUser.id }, {});
  },

  fakeSheets,
  demoSheets,
};
