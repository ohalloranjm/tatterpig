'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'SheetLabels',
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
        labelId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Labels',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        value: {
          type: Sequelize.STRING(500),
        },
        index: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
    options.tableName = 'SheetLabels';
    await queryInterface.dropTable(options);
  },
};
