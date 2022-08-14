const ERRORS = {
    unauthorized: 401,
    conflict: 409,
    not_found: 404,
    bad_request: 400
};
export default function errorHandler(err, req, res, next) {
    console.log(err);
    const type = err.type;
    const message = err.message;
    let statusCode = ERRORS[type];
    if (!statusCode)
        statusCode = 500; // any other types
    if (message)
        return res.status(statusCode).send(message);
    else
        return res.sendStatus(statusCode);
}
