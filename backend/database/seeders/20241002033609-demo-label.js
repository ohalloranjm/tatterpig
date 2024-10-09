'use strict';

const { User, Label } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const fakeLabels = [
  {
    name: 'Strength',
    dataType: 'number',
  },
  {
    name: 'Cuteness',
    dataType: 'number',
  },
  {
    name: 'Hit Points',
    dataType: 'number',
  },
  {
    name: 'Max HP',
    dataType: 'number',
  },
  {
    name: 'Primary weapon',
    dataType: 'string',
  },
  {
    name: 'Unstable',
    dataType: 'boolean',
  },
];

module.exports = {
  async up(_queryInterface, _Sequelize) {
    const owner = await User.findOne({ where: { username: 'demo' } });
    const ownerId = owner.id;
    const finalLabels = fakeLabels.map(a => ({ ...a, ownerId }));
    await Label.bulkCreate(finalLabels, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Labels';
    const owner = await User.findOne({ where: { username: 'demo' } });
    const ownerId = owner.id;
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: fakeLabels.reduce((arr, u) => [...arr, u.name], []),
        },
        ownerId,
      },
      {}
    );
  },

  fakeLabels,
};
