const fs = require('fs');
const path = require('path');

const indexRoutes = [

];

const notControllers = [
  'index.js',
  '.DS_Store',
];

module.exports.register = (server, options, next) => {
  server.route(indexRoutes);

  fs.readdir(__dirname, (err, files) => {
    if (err) return next(err);
    files.forEach((file) => {
      if (notControllers.indexOf(file) === -1) {
        server.log(['info', 'basic-views'], file);

        const routes = require(path.join(__dirname, file)); // eslint-disable-line global-require
        const updatedRoutes = [];
        routes.forEach((handler) => {
          const newHandler = handler;
          const controller = file.toLowerCase().slice(0, file.indexOf('.'));
          newHandler.path = `/${controller}${handler.path}`;
          updatedRoutes.push(newHandler);
        });
        server.route(updatedRoutes);
      }
    });
    return next();
  });
};

module.exports.register.attributes = {
  name: 'basic-views',
  version: '0.0.0',
};
