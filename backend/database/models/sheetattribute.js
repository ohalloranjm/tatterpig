'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SheetAttribute extends Model {
    static associate(models) {
      SheetAttribute.belongsTo(models.Sheet, { foreignKey: 'sheetId' });
      SheetAttribute.belongsTo(models.Attribute, { foreignKey: 'attributeId' });
    }
  }
  SheetAttribute.init(
    {
      sheetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      attributeId: {
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
      modelName: 'SheetAttribute',
    }
  );
  return SheetAttribute;
};
