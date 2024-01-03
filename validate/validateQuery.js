const Joi = require("joi");

exports.validateConversionQuery = async (body) => {
    const schema = Joi.object({
        source: Joi.string().required(),
        amount: Joi.number().not(0).max(10000000000).required(),
        target: Joi.string().required(),
    });
    try {
        const value = await schema.validateAsync(body);
        return { status: true, body: value };
    } catch (error) {
        return { status: false, message: error.message };
    }
};