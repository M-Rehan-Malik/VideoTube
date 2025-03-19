import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import { registerUserController } from "../controllers/User/registerUser.controller";

const router = Router();

router.route("/register").post(
    // upload.fields([
    //     {
    //         name: "avatar",
    //         maxCount: 1
    //     },
    //     {
    //         name: "coverImage",
    //         maxCount: 1
    //     }
    // ]),
    registerUserController
)

export { router as userRouter }