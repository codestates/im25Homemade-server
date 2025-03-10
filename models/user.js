'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.STRING,
      avatar_url: DataTypes.STRING,
      createdAt: {
        defaultValue: sequelize.literal('now()'),
        type: DataTypes.DATE,
      },
      updatedAt: {
        defaultValue: sequelize.literal('now()'),
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  return user;
};
