import Joi from 'joi';
import {createUserData, searchUserData} from "../services/authService.js";
import {createVoteData} from "../services/votesService.js";

type validateVoteData = Omit<createVoteData, "userId">;

const loginSChemaValidate = Joi.object<searchUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const siginSChemaValidate = Joi.object<createUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required(),
    name: Joi.string().required()
});

const voteSChemaValidate = Joi.object<validateVoteData>({
    newsId: Joi.number().required(),
    type: Joi.string().valid("HOT", "COLD").required()
});

export {
    loginSChemaValidate,
    siginSChemaValidate,
    voteSChemaValidate
}