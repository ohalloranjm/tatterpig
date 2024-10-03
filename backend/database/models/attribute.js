'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    static associate(models) {
      Attribute.belongsTo(models.User, { foreignKey: 'ownerId' });
      Attribute.hasMany(models.SheetAttribute, { foreignKey: 'attributeId' });
    }
  }
  Attribute.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: 'Name must be 50 or fewer characters',
          },
          notEmpty: {
            args: true,
            msg: 'Attribute name is required',
          },
        },
      },
      ephemeral: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      dataType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['string', 'number', 'boolean']],
        },
      },
    },
    {
      sequelize,
      modelName: 'Attribute',
    }
  );
  return Attribute;
};
