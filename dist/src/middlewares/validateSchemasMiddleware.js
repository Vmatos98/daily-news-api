export default function validateSchema(schema) {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        if (result.error) {
            res.status(422).send(result.error.details[0].message);
            return;
        }
        next();
    };
}
