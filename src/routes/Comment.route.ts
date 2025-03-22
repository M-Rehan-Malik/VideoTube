import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createCommentController, deleteCommentController, getVideoCommentsController, updateCommentController } from "../controllers/Comment";
import { commentAdminmiddleware } from "../middlewares/commentAdmin.middleware";

const router = Router();

router.use(authMiddleware);

router.route("/:id").get(
    getVideoCommentsController
)

router.route("/create/:id").post(
    createCommentController
)

router.route("/update/:id").patch(
    commentAdminmiddleware,
    updateCommentController
)

router.route("/delete/:id").delete(
    commentAdminmiddleware,
    deleteCommentController
)

export { router as commentRouter };