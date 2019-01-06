var Joi = require('joi');

exports.getOneUser = {
    params: {
        id: Joi.string().required()
    }
};

exports.addUser = {
    body: {
        fullName: Joi.object().keys({
            first: Joi.string().min(3).max(30),
            lasr: Joi.string().min(3).max(30)
        }),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    }
};

exports.updateUser = {
    params: {
        id: Joi.string().required(),
    },
    body: {
        firstName: Joi.string().required(),
        refName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    }
};

exports.deleteUser = {
    params: {
        id: Joi.string().required()
    }
};
