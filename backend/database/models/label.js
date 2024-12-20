'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    static associate(models) {
      Label.belongsTo(models.User, { foreignKey: 'ownerId' });
      Label.hasMany(models.SheetLabel, { foreignKey: 'labelId' });
    }
  }
  Label.init(
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
            msg: 'Name is required',
          },
          notNull: {
            args: true,
            msg: 'Name is required',
          },
        },
      },
      dataType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['string', 'number', 'boolean']],
            msg: 'Data type must be one of string, number, or boolean',
          },
          notNull: {
            args: true,
            msg: 'Data type is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Label',
    }
  );
  return Label;
};
