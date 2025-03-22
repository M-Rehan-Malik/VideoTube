import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTweetController, getUserTweetsController, updateTweetController } from "../controllers/Tweet";
import { tweetAdminMiddleware } from "../middlewares/tweetAdmin.middleware";

const router = Router();

router.use(authMiddleware);

router.route("/create").post(
    createTweetController
)

router.route("/:id").get(
    getUserTweetsController
)

router.route("/update/:id").patch(
    tweetAdminMiddleware,
    updateTweetController
)



export { router as tweetRouter }