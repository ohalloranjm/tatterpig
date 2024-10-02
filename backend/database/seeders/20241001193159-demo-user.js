'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const fakeUsers = [
  {
    email: 'demo@user.io',
    username: 'demo',
    hashedPassword: bcrypt.hashSync('demopassword'),
  },
  {
    email: 'user1@user.io',
    username: 'FakeUser1',
    hashedPassword: bcrypt.hashSync('password1'),
  },
  {
    email: 'user2@user.io',
    username: 'FakeUser2',
    hashedPassword: bcrypt.hashSync('password2'),
  },
];

module.exports = {
  async up(_queryInterface, _Sequelize) {
    await User.bulkCreate(fakeUsers, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: fakeUsers.reduce((arr, u) => [...arr, u.username], []),
        },
      },
      {}
    );
  },
};
