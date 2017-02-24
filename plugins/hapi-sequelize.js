const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.json'))[env];

module.exports.register = (server, options, next) => {
  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  const models = {};

  fs
    .readdirSync(path.join(__dirname, '../models'))
    .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, '../models', file));
      models[model.name] = model;
    });

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
  console.log(sequelize);
  server.decorate('server', 'sequelize', sequelize);
  server.decorate('server', 'sequelizeModels', models);

  next();
};

module.exports.register.attributes = {
  name: 'hapi-sequelize',
  version: '0.0.0',
};

// OLD index.js FOR MODELS
//
// 'use strict';
//
// var fs        = require('fs');
// var path      = require('path');
// var Sequelize = require('sequelize');
// var basename  = path.basename(module.filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config.json')[env];
// var db        = {};
//
// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
//
// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(function(file) {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });
//
// Object.keys(db).forEach(function(modelName) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
//
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
//
// module.exports = db;
