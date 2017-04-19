const service = require('./Service.js');
const schema = require('./Schema.js');

const paths = [
  {
    method: 'POST',
    path: '/address',
    config: {
      validate: {
        payload: schema.addresses,
      },
    },
    handler: (req, res) => {
      const payload = req.payload;
      service.addAddresses(payload.clients, payload.time, null, null).then(
      (result) => {
        res({
          statusCode: 201,
          message: 'Successfully added addresses',
          result,
        });
      },
      (err) => {
        res({
          statusCode: 500,
          message: 'Failed to add addresses',
          error: err,
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
