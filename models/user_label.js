'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_label.init(
    {
      userId: DataTypes.INTEGER,
      labelId: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'user_label',
    },
  );
  return user_label;
};
