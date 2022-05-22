import Joi from "joi";


export const albumSchema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().required(),
    gender: Joi.string().required(),
    listeners: Joi.number().required()
});