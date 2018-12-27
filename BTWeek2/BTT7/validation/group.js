var Joi = require('joi');
 
exports.getOneGroup = {
    params: {
        id: Joi.string().required()
    }
};

exports.addGroup = {
    body: {
        name: Joi.string().required(),
        author: Joi.string().required()
    }
};

exports.updateGroup = {
    params: {
        id: Joi.string().required(),
    },
    body: {
        name: Joi.string().required(),
        author: Joi.string().required()
    }
};

exports.deleteGroup = {
    params: {
        id: Joi.string().required()
    }
};
