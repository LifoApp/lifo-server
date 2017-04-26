const Promise = require('bluebird');

const server = require('./../../server.js');
const CollectionService = require('./../Collection/Service.js');

const Models = server.sequelize.models;
const SLocation = Models.Location;

const Service = {
  getLocationsList: () => {
    const processedLocations = [];
    return SLocation.findAll().then(rawLocations => new Promise((resolve) => {
      rawLocations.forEach((location) => {
        processedLocations.push({
          id: location.id,
          name: location.name,
          latitude: location.latitude,
          longitude: location.longitude,
          radius: location.radius,
        });
      });
      resolve(processedLocations);
    }));
  },
  createLocation: (location) => {
    const DEFAULT_LOCATION = {
      name: 'DEFAULT',
      latitude: 33.9698,
      longitude: -118.4169,
      radius: 0.003,
    };

    const data = DEFAULT_LOCATION;
    data.name = location.name || data.name;
    data.latitude = location.latitude || data.latitude;
    data.longitude = location.longitude || data.longitude;
    data.radius = location.radius || data.radius;

    return SLocation.create(data).then(rawLocation => new Promise((resolve) => {
      resolve({
        id: rawLocation.id,
        name: rawLocation.name,
        latitude: rawLocation.latitude,
        longitude: rawLocation.longitude,
        radius: rawLocation.radius,
      });
    }));
  },
  getLocation: id => SLocation.findById(id).then(rawLocation => new Promise((resolve) => {
    if (!rawLocation) resolve({});
    resolve({
      id: rawLocation.id,
      name: rawLocation.name,
      latitude: rawLocation.latitude,
      longitude: rawLocation.longitude,
      radius: rawLocation.radius,
    });
  })),
  getLocationCount: id => SLocation.findById(id)
  .then(location => CollectionService.getAddressesWithinRange({
    latitude: location.latitude,
    longitude: location.longitude,
    radius: location.radius,
  })),
};

module.exports = Service;
