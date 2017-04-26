const Joi = require('joi');

const schema = {
  addresses: Joi.object().keys({
    clients: Joi.array().items(Joi.string()).required(),
    time: Joi.date().iso().required(),
    latitude: Joi.number().min(-90).max(90),
    longitude: Joi.number().min(-180).max(180),
  }),
};

module.exports = schema;
