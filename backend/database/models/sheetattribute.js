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
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'SheetAttribute',
    }
  );
  return SheetAttribute;
};
