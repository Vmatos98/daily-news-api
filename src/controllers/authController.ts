import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import Cookies from 'js-cookie'


import * as User from "../services/authService.js"

async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findUser({email, password});
    if(!user){
        throw { type: "unauthorized", message: "invalid email or password" };
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {expiresIn: 60*60*12 });
    // Cookies.set('token', token, { expires: 1 });
    res.cookie('token', token, { httpOnly: true, sameSite: "none", secure: true });
    delete user.password;
    delete user.createdAt;
    console.log(user);
    
    res.status(200).send(user);
}

async function sigin(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await User.findUser({email, password});
    if(user){
        throw { type: "conflict", message: "User already exists"}
    }
    const response = await User.createUser(req.body);
    const token = jwt.sign({ userId: response.id }, process.env.JWT_SECRET, {expiresIn: 60*60*12 });
    res.cookie('token', token, { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(201);
}

async function sessionValidation (req: Request, res: Response) {
    res.status(200).send(res.locals.userId);
}

export {
    login,
    sigin,
    sessionValidation
}