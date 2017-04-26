const Joi = require('joi');

const Schema = {
  location: Joi.object().keys({
    name: Joi.string().required(),
    latitude: Joi.number().min(-90).max(90),
    longitude: Joi.number().min(-180).max(180),
    radius: Joi.number().positive().max(90),
  }),
};

module.exports = Schema;
