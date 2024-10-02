'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sheet extends Model {
    static associate(models) {
      Sheet.belongsTo(models.User, { foreignKey: 'ownerId' });
      Sheet.hasMany(models.SheetAttribute, { foreignKey: 'sheetId' });
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
      },
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      description: {
        type: DataTypes.STRING(2000),
      },
    },
    {
      sequelize,
      modelName: 'Sheet',
    }
  );
  return Sheet;
};
