import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
    registerUserController,
    loginUserController,
    logoutUserController,
    changePasswordController,
    getCurrentUserController,
    updateUserAccountController,
    updateUserAvatarController,
    updateUserCoverImageController,
    getUserChannelProfileController,
    getWatchHistoryController
} from "../controllers/User";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUserController
)

router.route("/login").post(loginUserController)

// Protected Routes

router.route("/logout").post(authMiddleware, logoutUserController)

router.route("/change-password").post(authMiddleware, changePasswordController)

router.route("/current-user").get(authMiddleware, getCurrentUserController)

router.route("/update-user").patch(authMiddleware, updateUserAccountController)

router.route("/update-avatar").patch(
    authMiddleware,
    upload.single("avatar"),
    updateUserAvatarController
)

router.route("/update-cover-image").patch(
    authMiddleware,
    upload.single("coverImage"),
    updateUserCoverImageController
)

router.route("/c/:username").get(
    authMiddleware,
    getUserChannelProfileController
)

router.route("/watch-history").get(
    authMiddleware,
    getWatchHistoryController
)

export { router as userRouter }