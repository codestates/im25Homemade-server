'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { categorie, comment, content, image, label, user } = sequelize.models;
comment.belongsTo(user);
comment.belongsTo(content);
user.hasMany(comment);
content.hasMany(comment);
categorie.hasMany(content);
content.belongsTo(categorie);
content.hasMany(image);
image.belongsTo(content);
user.hasMany(content);
content.belongsTo(user);
// user.belongsToMany(label, { through: user_label });
// label.belongsToMany(user, { through: user_label });

module.exports = db;
