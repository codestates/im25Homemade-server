'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  categorie.init({
    name: DataTypes.STRING,
    contentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'categorie',
  });
  return categorie;
};