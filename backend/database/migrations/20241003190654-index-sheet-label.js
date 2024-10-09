'use strict';

let options = { tableName: 'SheetLabels' };
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.addIndex(options, ['sheetId', 'labelId'], {
      unique: true,
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeIndex(options, ['sheetId', 'labelId']);
  },
};
