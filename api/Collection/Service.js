const Promise = require('bluebird');

const server = require('./../../server.js');

const service = {
  addAddresses: (addresses, timestamp, latitude, longitude) => {
    const DEFAULT_ID = {
      name: '00:00:00:00:00:00',
      timestamp: '2017-01-01T00:00:00.000Z',
      latitude: 33.9698,
      longitude: -118.4169,
    };
    return Promise.map(addresses, (client) => {
      const data = DEFAULT_ID;
      data.name = client || data.name;
      data.timestamp = timestamp || data.timestamp;
      data.latitude = latitude || data.latitude;
      data.longitude = longitude || data.longitude;

      return server.sequelize.models.Identifier.create(data);
    });
  },
};

module.exports = service;
