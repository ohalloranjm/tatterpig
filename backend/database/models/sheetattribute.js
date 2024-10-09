'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SheetLabel extends Model {
    static associate(models) {
      SheetLabel.belongsTo(models.Sheet, { foreignKey: 'sheetId' });
      SheetLabel.belongsTo(models.Label, { foreignKey: 'labelId' });
    }
  }
  SheetLabel.init(
    {
      sheetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      labelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING(500),
        validate: {
          len: {
            args: [1, 500],
            msg: 'Value must be 500 or fewer characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'SheetLabel',
    }
  );
  return SheetLabel;
};
