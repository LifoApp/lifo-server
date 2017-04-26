const Promise = require('bluebird');
const Moment = require('moment');

const server = require('./../../server.js');

const Models = server.sequelize.models;
const SIdentifier = Models.Identifier;

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

      return SIdentifier.create(data);
    });
  },
  getAddressesWithinRange: (options) => {
    const DEFAULT_OPTIONS = {
      latitudeMin: 33.9668,
      latitudeMax: 33.9728,
      longitudeMin: -118.4199,
      longitudeMax: -118.4139,
    };

    // Make sure to look at R-Tree indexing for optimization
    const findValue = (optimal, partial1, partial2, last) => {
      if (optimal) {
        return optimal;
      } else if (partial1 && partial2) {
        return partial1 + partial2;
      }
      return last;
    };
    const latitudeMin = findValue(options.latitudeMin,
      options.latitude,
      0 - options.radius,
      DEFAULT_OPTIONS.latitudeMin);
    const latitudeMax = findValue(options.latitudeMax,
      options.latitude,
      options.radius,
      DEFAULT_OPTIONS.latitudeMax);
    const longitudeMin = findValue(options.longitudeMin,
      options.longitude,
      0 - options.radius,
      DEFAULT_OPTIONS.longitudeMin);
    const longitudeMax = findValue(options.longitudeMax,
      options.longitude,
      options.radius,
      DEFAULT_OPTIONS.longitudeMax);
    const start = options.start || Moment().subtract(1, 'hours').toISOString();
    const end = options.end || Moment().toISOString();

    return SIdentifier.aggregate('name', 'count', {
      distinct: true,
      where: {
        latitude: {
          $gte: latitudeMin,
          $lte: latitudeMax,
        },
        longitude: {
          $gte: longitudeMin,
          $lte: longitudeMax,
        },
        timestamp: {
          $gte: start,
          $lte: end,
        },
      },
    });
  },
};

module.exports = service;
