import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { videoAdminMiddleware } from "../middlewares/videoAdmin.middleware";
import {
    deleteVideoController,
getAllVideosController,
getVideoController,
publishVideoController,
toggleIsPublishedController,
updateVideoDetailsController,
updateVideoThumbnailController
} from "../controllers/Video";

const router = Router();

router.use(authMiddleware);

router.route("/").get(
    getAllVideosController
)

router.route("/publish").post(
    upload.fields([
        {
            name: "video",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    publishVideoController
)

router.route("/watch/:id").get(
    getVideoController
)

router.route("/update-details/:id").patch(
    videoAdminMiddleware,
    updateVideoDetailsController
)

router.route("/update-thumbnail/:id").patch(
    videoAdminMiddleware,
    upload.single("thumbnail"),
    updateVideoThumbnailController
)

router.route("/delete/:id").delete(
    videoAdminMiddleware,
    deleteVideoController
)

router.route("/toggle-publish/:id").patch(
    videoAdminMiddleware,
    toggleIsPublishedController
)

export { router as videoRouter }