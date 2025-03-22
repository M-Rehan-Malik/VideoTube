import { PlaylistInterface, PlaylistModel } from "../../models/Playlist.model";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const getPlaylistController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "Playlist ID is required",
            400
        )
    }

    const playlist = await PlaylistModel.findById(id);

    if (!playlist) {
        throw new ApiError(
            "Playlist not found",
            404
        )
    }

    return res.status(200)
    .json(
        new ApiResponse<PlaylistInterface>(
            true,
            playlist,
            "Playlist found"
        )
    )
})