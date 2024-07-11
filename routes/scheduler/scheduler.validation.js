const Joi = require('joi');

const start = {
    body: Joi.object().keys({
        all: Joi.boolean(),
        not: Joi.array().items(Joi.alternatives().try(Joi.string(), Joi.number())),
        only: Joi.array().items(Joi.alternatives().try(Joi.string(), Joi.number())),
    })
};

const stop = {
    body: Joi.object().keys({
        all: Joi.boolean(),
        not: Joi.array().items(Joi.alternatives().try(Joi.string(), Joi.number())),
        only: Joi.array().items(Joi.alternatives().try(Joi.string(), Joi.number())),
    })
};

module.exports = { start, stop }; 