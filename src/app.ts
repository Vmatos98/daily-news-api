import 'express-async-errors';
import express, { json } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import router from './routes/index.js';
import errorHandler from './middlewares/errorHandlerMiddleware.js';


const app = express();
app.use(cookieParser());
app.use(json());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://project17-linkedir-front-430paj3fr-nikolasrr.vercel.app"] }));
app.use(router);
app.use(errorHandler);

export default app;

