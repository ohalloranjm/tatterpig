'use strict';

const { User, Label, Sheet } = require('../models');
const { fakeSheets } = require('./20241002025726-demo-sheet');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const fakeLabels = [
  [
    { name: 'Class', dataType: 'string' },
    { name: 'Level', dataType: 'number' },
    { name: 'Hit Points', dataType: 'number' },
    { name: 'Max HP', dataType: 'number' },
    { name: 'Strength', dataType: 'number' },
    { name: 'Dexterity', dataType: 'number' },
    { name: 'Constitution', dataType: 'number' },
    { name: 'Intelligence', dataType: 'number' },
    { name: 'Wisdom', dataType: 'number' },
    { name: 'Charisma', dataType: 'number' },
    { name: 'Strength modifier', dataType: 'number' },
    { name: 'Dexterity modifier', dataType: 'number' },
    { name: 'Constitution modifier', dataType: 'number' },
    { name: 'Intelligence modifier', dataType: 'number' },
    { name: 'Wisdom modifier', dataType: 'number' },
    { name: 'Charisma modifier', dataType: 'number' },
    { name: 'Hit Dice', dataType: 'number' },
    { name: 'Max Hit Dice', dataType: 'number' },
    { name: 'Primary weapon', dataType: 'string' },
    { name: 'Primary weapon damage', dataType: 'string' },
    { name: 'Blinded', dataType: 'boolean' },
    { name: 'Charmed', dataType: 'boolean' },
    { name: 'Incapacitated', dataType: 'boolean' },
    { name: 'Paralyzed', dataType: 'boolean' },
    { name: 'Stunned', dataType: 'boolean' },
    { name: 'Unconscious', dataType: 'boolean' },
  ],
  [
    { name: 'Playbook', dataType: 'string' },
    { name: 'Charm', dataType: 'number' },
    { name: 'Cool', dataType: 'number' },
    { name: 'Sharp', dataType: 'number' },
    { name: 'Tough', dataType: 'number' },
    { name: 'Weird', dataType: 'number' },
    { name: 'Harm', dataType: 'number' },
    { name: 'Weapon 1', dataType: 'string' },
    { name: 'Weapon 2', dataType: 'string' },
    { name: 'Unstable', dataType: 'boolean' },
  ],
  [
    { name: 'Style', dataType: 'string' },
    { name: 'Role', dataType: 'string' },
    { name: 'Number', dataType: 'number' },
    { name: 'Ship Strength #1', dataType: 'string' },
    { name: 'Ship Strength #2', dataType: 'string' },
    { name: 'Ship Weakness', dataType: 'string' },
  ],
  [
    { name: 'Monster Type', dataType: 'string' },
    { name: 'Scenario', dataType: 'string' },
    { name: 'Personal Stake', dataType: 'string' },
    { name: 'Number', dataType: 'number' },
  ],
];

const allLabels = [];

fakeLabels.forEach(array => {
  array.forEach(label => allLabels.push({ ...label }));
});

module.exports = {
  async up(_queryInterface, _Sequelize) {
    const owner = await User.findOne({ where: { username: 'tomorrowind' } });
    const ownerId = owner.id;

    const finalLabels = allLabels.map(l => ({ ...l, ownerId }));
    await Label.bulkCreate(finalLabels, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Labels';
    const owner = await User.findOne({ where: { username: 'tomorrowind' } });
    const ownerId = owner.id;
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: allLabels.reduce((arr, u) => [...arr, u.name], []),
        },
        ownerId,
      },
      {}
    );
  },

  fakeLabels,
};
