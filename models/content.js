'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  content.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      thumbnail_url: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      rate: { type: DataTypes.INTEGER, defaultValue: 0 },
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
      modelName: 'content',
    },
  );
  return content;
};
