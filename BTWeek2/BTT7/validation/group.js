var Joi = require('joi');
//Joi.objectId = require('joi-objectid')(Joi);
//var objectID = require('mongodb').ObjectID;

exports.getAllGroup = {
    query: {
        page: Joi.number().min(1).max(50).required(),
        limit: Joi.number().min(1).max(10).required()
    }
};

exports.getOneGroup = {
    params: {
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
};

exports.addGroup = {
    body: {
        name: Joi.string().required(),
        members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).required(),
        lastMessage: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
};

exports.updateGroup = {
    params: {
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    },
    body: {
        name: Joi.string().required(),
        members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).required(),
        lastMessage: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        author: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
};

exports.deleteGroup = {
    // params: {
    //     id: Joi.string().required()
    // }
};

exports.addMemberToGroup = {
    params: {
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    },
    body: {
        members: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).required()
    }
};

exports.deleteMemberToGroup = {
    params: {
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        memberid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
};