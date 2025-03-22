import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getLikedVideosController, toggleLikeController } from "../controllers/Like";

const router = Router();

router.use(authMiddleware);

router.route("/toggle/:id").post(
    toggleLikeController
)

router.route("/videos").get(
    getLikedVideosController
)

export { router as likeRouter }