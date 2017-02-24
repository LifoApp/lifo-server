require('dotenv').config();
const Hapi = require('hapi');
const Path = require('path');
const Vision = require('vision');
const Inert = require('inert');
const NunjucksHapi = require('nunjucks-hapi');
const Good = require('good');

const Sequelize = require('./plugins/hapi-sequelize.js');

const Api = require('./api');
const Views = require('./views');

const setup = {
  host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
  port: process.env.PORT || '8080',
};

const BasicServer = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'static'),
      },
    },
  },
});
BasicServer.connection({
  host: setup.host,
  port: setup.port,
});

BasicServer.register(Sequelize);
BasicServer.register(Api, {
  routes: {
    prefix: '/api',
  },
});

BasicServer.register(Inert);
BasicServer.register(Vision, () => {
  BasicServer.views({
    engines: {
      html: NunjucksHapi,
    },
    path: Path.join(__dirname, 'templates'),
  });
});
BasicServer.register(Views);

BasicServer.register({
  register: Good,
  options: {
    ops: {
      interval: 1000,
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          log: '*',
          response: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, (err) => {
  if (err) BasicServer.log(['error', 'good'], err);
});

BasicServer.start(() => {
  BasicServer.log(['info', 'BasicServer'], `Server started on ${setup.host}:${setup.port}`);
});

module.exports = BasicServer;
