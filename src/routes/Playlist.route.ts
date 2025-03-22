import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addVideoToPlaylistController, createPlaylistController, deletePlaylistController, getPlaylistController, removeVideoFromPlaylistController, updatePlaylistController } from "../controllers/Playlist";
import { playlistAdminMiddleware } from "../middlewares/playlistAdmin.middleware";

const router = Router();

router.use(authMiddleware);

router.route("/create").post(
    createPlaylistController
)

router.route("/:id").get(
    getPlaylistController
)

router.route("/update/:id").patch(
    playlistAdminMiddleware,
    updatePlaylistController
)

router.route("/delete/:id").delete(
    playlistAdminMiddleware,
    deletePlaylistController
)

router.route("/add/:videoId/:playlistId").post(
    playlistAdminMiddleware,
    addVideoToPlaylistController
)

router.route("/remove/:videoId/:playlistId").post(
    playlistAdminMiddleware,
    removeVideoFromPlaylistController
)

export { router as playlistRouter }