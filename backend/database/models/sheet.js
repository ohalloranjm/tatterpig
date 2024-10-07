'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sheet extends Model {
    static associate(models) {
      Sheet.belongsTo(models.User, { foreignKey: 'ownerId' });
      Sheet.hasMany(models.SheetLabel, { foreignKey: 'sheetId' });
    }
  }
  Sheet.init(
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
        },
      },
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: DataTypes.STRING(2000),
        validate: {
          len: {
            args: [1, 2000],
            msg: 'Description must be 2000 or fewer characters',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Sheet',
    }
  );
  return Sheet;
};
