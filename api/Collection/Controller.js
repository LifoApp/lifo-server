const server = require('./../../server.js');

const paths = [
  {
    method: 'POST',
    path: '/address',
    handler: (req, res) => {
      // console.log(server.sequelize.models.);
      server.log(['info', 'testing'], req.payload);
      res({
        statusCode: 200,
        message: 'Welcome to the Lifo API',
      }).code(200);
    },
  },
  {
    method: 'POST',
    path: '/count',
    handler: (req, res) => {
      req.log(req.payload);
      res({
        statusCode: 200,
        message: 'Welcome to the Lifo API',
      }).code(200);
    },
  },
];

module.exports = paths;
