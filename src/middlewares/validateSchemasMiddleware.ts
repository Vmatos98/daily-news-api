import { NextFunction, Request, Response} from "express";
import {ObjectSchema} from "joi";

export default function validateSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body);
        if (result.error) {
            res.status(422).send(result.error.details[0].message);
            return;
        }
        next();
    }
}