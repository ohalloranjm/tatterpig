'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Sheets',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        name: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        public: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        description: {
          type: Sequelize.STRING(2000),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Sheets';
    await queryInterface.dropTable(options);
  },
};
