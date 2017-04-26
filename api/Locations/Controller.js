const Service = require('./Service.js');
const Schema = require('./Schema.js');

const paths = [
  {
    method: 'GET',
    path: '',
    handler: (req, res) => {
      Service.getLocationsList().then(
      (result) => {
        res({
          statusCode: 200,
          message: 'Successfully got Locations List',
          result,
        }).code(200);
      },
      (error) => {
        res({
          statusCode: 500,
          message: 'Failed to get Locations List',
          error,
        }).code(500);
      });
    },
  },
  {
    method: 'POST',
    path: '',
    config: {
      validate: {
        payload: Schema.location,
      },
    },
    handler: (req, res) => {
      Service.createLocation(req.payload).then(
      (result) => {
        res({
          statusCode: 200,
          message: 'Successfully created Location',
          result,
        }).code(200);
      },
      (error) => {
        res({
          statusCode: 500,
          message: 'Failed to create Location',
          error,
        }).code(500);
      });
    },
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: (req, res) => {
      Service.getLocation(req.params.id).then(
      (result) => {
        res({
          statusCode: 200,
          message: 'Successfully got Location',
          result,
        }).code(200);
      },
      (error) => {
        res({
          statusCode: 500,
          message: 'Failed to get Location',
          error,
        }).code(500);
      });
    },
  },
  {
    method: 'GET',
    path: '/{id}/count',
    handler: (req, res) => {
      Service.getLocationCount(req.params.id).then(
      (result) => {
        res({
          statusCode: 200,
          message: 'Successfully counted for Location',
          result,
        }).code(200);
      },
      (error) => {
        res({
          statusCode: 500,
          message: 'Failed to count for Location',
          error,
        }).code(500);
      });
    },
  },
];

module.exports = paths;
