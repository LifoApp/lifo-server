const Promise = require('bluebird');
const Moment = require('moment');

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
  getLocation: id => SLocation.findById(id).then(rawLocation => new Promise((resolve, reject) => {
    if (!rawLocation) reject({ code: 404 });
    resolve({
      id: rawLocation.id,
      name: rawLocation.name,
      latitude: rawLocation.latitude,
      longitude: rawLocation.longitude,
      radius: rawLocation.radius,
    });
  })),
  getLocationCount: (id, query) => SLocation.findById(id)
  .then((location) => {
    if (!location) return Promise.reject({ code: 404 });
    const timeSlices = [];
    if (query.start && query.end && query.slice) {
      let previousTime = Moment(query.end);
      for (let time = Moment(query.end).subtract(query.slice, 'minutes');
      time.isSameOrAfter(Moment(query.start));
      time = time.subtract(query.slice, 'minutes')) {
        timeSlices.unshift({
          start: time.toISOString(),
          end: previousTime.toISOString(),
        });
        previousTime = Moment(time);
      }
    } else {
      timeSlices.push({
        start: Moment().subtract(1, 'hours'),
        end: Moment(),
      });
    }
    return Promise.map(timeSlices, slice => CollectionService.getAddressesWithinRange({
      latitude: location.latitude,
      longitude: location.longitude,
      radius: location.radius,
      start: slice.start,
      end: slice.end,
    }))
    .then(counts => new Promise((resolve) => {
      const result = [];
      for (let i = 0, len = counts.length; i < len; i += 1) {
        result.push({
          count: counts[i],
          start: timeSlices[i].start,
          end: timeSlices[i].end,
        });
      }
      resolve(result);
    }));
  })
  .catch((error) => {
    server.log(['error', 'LocationsService'], error);
    return Promise.reject(error);
  }),
  adjustValuesForLocation: (id, timeSlices) => SLocation.findById(id)
  .then((location) => {
    if (!location) return Promise.reject({ code: 404 });
    return Promise.map(timeSlices, slice => CollectionService.getAddressesWithinRange({
      latitude: location.latitude,
      longitude: location.longitude,
      radius: location.radius,
      start: Moment(slice.start).startOf('day'),
      end: Moment(slice.start).startOf('day').add(10, 'minutes'),
    }))
    .then(counts => new Promise((resolve) => {
      const result = [];
      for (let i = 0, len = counts.length; i < len; i += 1) {
        result.push({
          count: timeSlices[i].count - counts[i],
          start: timeSlices[i].start,
          end: timeSlices[i].end,
        });
      }
      resolve(result);
    }));
  }),
};

module.exports = Service;
