'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.addIndex(
      'SheetAttributes',
      ['sheetId', 'attributeId'],
      {
        unique: true,
      }
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeIndex('SheetAttributes', [
      'sheetId',
      'attributeId',
    ]);
  },
};
