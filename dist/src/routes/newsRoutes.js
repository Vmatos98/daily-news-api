import { Router } from 'express';
import * as controllers from '../controllers/newsController.js';
import jwtValidateMiddleware from "../middlewares/jwtValidateMiddleware.js";
const newsRoute = Router();
newsRoute.get("/news", jwtValidateMiddleware, controllers.getNews);
newsRoute.get("/categories", jwtValidateMiddleware, controllers.getAllCategories);
newsRoute.get("/usercategories", jwtValidateMiddleware, controllers.getUserCategories);
newsRoute.get("/tops", jwtValidateMiddleware, controllers.getTops);
export default newsRoute;
