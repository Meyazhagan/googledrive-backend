const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const type = {
    USER: "USER",
    UPDATE_USER: "UPDATE_USER",
    LOGIN: "LOGIN",
    PASSWORD: "PASSWORD",
    EMAIL: "EMAIL",
    FOLDER: "FOLDER",
};

const schema = {
    LOGIN: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),

    USER: Joi.object({
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        conformPassword: Joi.ref("password"),
        address: {
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zip: Joi.string(),
        },
    }),
    UPDATE_USER: Joi.object({
        firstName: Joi.string().min(5).max(50),
        lastName: Joi.string().max(50),
        address: {
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zip: Joi.string(),
        },
    }),

    PASSWORD: Joi.object({
        password: Joi.string().required(),
        conformPassword: Joi.ref("password"),
    }),

    EMAIL: Joi.object({
        email: Joi.string().email().required(),
    }),

    FOLDER: Joi.object({
        folderName: Joi.string().max(255).required(),
        parentFolder: Joi.objectId(),
    }),
    FILE: Joi.object({
        FileName: Joi.string().max(255).required(),
        parentFolder: Joi.objectId(),
    }),
};

exports.type = type;

exports.validateBody = (type) => {
    return (req, res, next) => {
        const option = { abortEarly: false };

        const { error } = schema[type].validate(req.body, option);

        if (error) {
            const errors = error.details.reduce((acc, { path, message }) => {
                return { ...acc, [path.join("-")]: message };
            }, {});

            return res.status(400).send({ errors });
        }

        next();
    };
};
