import { Router } from 'express';
import * as controllers from '../controllers/userCategoryController.js';
import jwtValidateMiddleware from "../middlewares/jwtValidateMiddleware.js"
const categoryRoute = Router();

categoryRoute.post("/categories",jwtValidateMiddleware, controllers.updateCategoryController);


export default categoryRoute;