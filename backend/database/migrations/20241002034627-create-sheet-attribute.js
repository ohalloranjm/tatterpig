'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'SheetAttributes',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        sheetId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Sheets',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        attributeId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Attributes',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        value: {
          type: Sequelize.STRING(500),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'SheetAttributes';
    await queryInterface.dropTable(options);
  },
};
