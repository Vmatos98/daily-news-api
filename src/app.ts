import 'express-async-errors';
import express, { json } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import router from './routes/index.js';
import errorHandler from './middlewares/errorHandlerMiddleware.js';


const app = express();
app.use(cookieParser());
app.use(json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(router);
app.use(errorHandler);

export default app;

