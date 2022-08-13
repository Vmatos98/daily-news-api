import { Router } from "express";
import authRoute from "./authRoutes.js";
import newsRoute from "./newsRoutes.js";
import voteRoute from "./voteRoutes.js";
import categoryRoute from "./userCategoryRoutes.js";
const router = Router();

router.use(authRoute);
router.use(newsRoute);
router.use(voteRoute);
router.use(categoryRoute);

export default router;