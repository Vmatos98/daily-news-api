import { Router } from 'express';
import * as controllers from '../controllers/votesController.js';
import jwtValidateMiddleware from "../middlewares/jwtValidateMiddleware.js"
import * as schemas from '../schemas/index.js';
import validateSchemasMiddleware from '../middlewares/validateSchemasMiddleware.js';

const voteRoute = Router();

voteRoute.post("/vote",jwtValidateMiddleware, validateSchemasMiddleware(schemas.voteSChemaValidate), controllers.newVote);
voteRoute.get("/vote",jwtValidateMiddleware, controllers.getUserVotes);
voteRoute.delete("/vote/:newsId",jwtValidateMiddleware, controllers.deleteVote);

export default voteRoute;