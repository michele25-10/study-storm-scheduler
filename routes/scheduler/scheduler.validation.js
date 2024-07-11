const Joi = require('joi');

const start = {
    body: Joi.object().keys({
        all: Joi.boolean(),
        not: Joi.array(),
        only: Joi.array(),
    })
};

const stop = {
    body: Joi.object().keys({
        all: Joi.boolean(),
        not: Joi.array(),
        only: Joi.array(),
    })
};

module.exports = { start, stop }; 