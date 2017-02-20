const fs = require('fs');
const path = require('path');

const notControllers = [
  'index.js',
  'HelperLibrary.js',
  '.DS_Store',
];

module.exports.register = (server, options, next) => {
  fs.readdir(__dirname, (err, files) => {
    if (err) return next(err);
    files.forEach((folder) => {
      if (notControllers.indexOf(folder) === -1) {
        server.log(['info', 'basic-api'], folder);

        const routes = require(path.join(__dirname, folder, 'Controller.js')); // eslint-disable-line global-require
        const updatedRoutes = [];
        routes.forEach((handler) => {
          const newHandler = handler;
          const controller = folder.toLowerCase();
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
  name: 'basic-api',
  version: '0.0.0',
};
