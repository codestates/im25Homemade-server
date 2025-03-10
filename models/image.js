'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  image.init(
    {
      name: DataTypes.STRING,
      image_url: DataTypes.STRING,
      order: DataTypes.INTEGER,
      contentId: DataTypes.INTEGER,
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
      modelName: 'image',
    },
  );
  return image;
};
