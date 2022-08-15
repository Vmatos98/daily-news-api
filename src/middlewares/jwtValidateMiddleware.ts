import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function jwtValidateMiddleware(req: Request, res: Response, next: NextFunction) {

    // const token = req.cookies.token;
    const value = req.headers["authorization"];
    const token = value?.split("Bearer ").join("").toString();
    if (!token) {
        throw { type: "unauthorized", message: "api key is missing" };
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        throw { type: "unauthorized", message: "invalid api key" };
    }
    console.log("validate");
    
    res.locals.userId= decoded;
    console.log(res.locals.userId);
    next();
}