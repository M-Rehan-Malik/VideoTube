import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getChannelSubscribersController, getSubscribedChannelsController, toggleSubscriptionController } from "../controllers/Subscription";

const router = Router();

router.use(authMiddleware);

router.route("/c/:id").get(
    getSubscribedChannelsController
).post(
    toggleSubscriptionController
)

router.route("/u/:id").get(
    getChannelSubscribersController
)

export { router as subscriptionRouter }