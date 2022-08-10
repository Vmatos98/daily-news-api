import { Router } from 'express';
import * as controllers from '../controllers/authController.js';
import * as schemas from '../schemas/index.js';
import validateSchemasMiddleware from '../middlewares/validateSchemasMiddleware.js';

const authRoute = Router();

authRoute.post("/login", validateSchemasMiddleware(schemas.loginSChemaValidate), controllers.login);
authRoute.post("/sigin", validateSchemasMiddleware(schemas.siginSChemaValidate), controllers.sigin);

export default authRoute;