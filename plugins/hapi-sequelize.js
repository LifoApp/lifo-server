const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '/../config/config.json'))[env];

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
      const model = sequelize.import(path.join(__dirname, file));
      models[model.name] = model;
    });

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  server.decorate('server', 'sequelize', sequelize);
  server.decorate('server', 'sequelizeModels', models);

  next();
};

module.exports.register.attributes = {
  name: 'hapi-sequelize',
  version: '0.0.0',
};
