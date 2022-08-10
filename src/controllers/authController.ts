import {Request, Response} from "express";
import jwt from "jsonwebtoken";

import * as User from "../services/authService.js"

async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findUser({email, password});
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*12 });
    res.status(200).send({ token });
}

async function sigin(req: Request, res: Response) {
    await User.createUser(req.body);
    res.sendStatus(201);
}

export {
    login,
    sigin
}