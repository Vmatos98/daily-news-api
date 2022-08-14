import Joi from 'joi';
const loginSChemaValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
const siginSChemaValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
    name: Joi.string().required()
});
const voteSChemaValidate = Joi.object({
    newsId: Joi.number().required(),
    type: Joi.string().valid("HOT", "COLD").required()
});
export { loginSChemaValidate, siginSChemaValidate, voteSChemaValidate };
