'use strict';

const { User, Attribute } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const fakeAttributes = [
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
    const finalAttributes = fakeAttributes.map(a => ({ ...a, ownerId }));
    await Attribute.bulkCreate(finalAttributes, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Attributes';
    const owner = await User.findOne({ where: { username: 'demo' } });
    const ownerId = owner.id;
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: fakeAttributes.reduce((arr, u) => [...arr, u.name], []),
        },
        ownerId,
      },
      {}
    );
  },

  fakeAttributes,
};
