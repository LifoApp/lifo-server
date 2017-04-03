const Promise = require('bluebird');

const server = require('./../../server.js');

const paths = [
  {
    method: 'POST',
    path: '/address',
    handler: (req, res) => {
      const DEFAULT_ID = {
        name: '00:00:00:00:00:00',
        timestamp: '2017-01-01T00:00:00.000Z',
        latitude: 33.9698,
        longitude: -118.4169,
      };
      // console.log(server.sequelize.models.);
      server.log(['info', 'testing'], req.payload);

      const time = req.payload.time;
      Promise.map(req.payload.clients, (client) => {
        const data = DEFAULT_ID;
        data.name = client || data.name;
        data.timestamp = time || data.timestamp;
        return server.sequelize.models.Identifier.create(data);
      }).then((result) => {
        res({
          statusCode: 201,
          message: 'Successfully added addresses',
          result,
        });
      });
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
