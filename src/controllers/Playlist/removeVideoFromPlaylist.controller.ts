import mongoose from "mongoose";
import { PlaylistInterface, PlaylistModel } from "../../models/Playlist.model";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";


export const removeVideoFromPlaylistController = asyncHandler(async (req, res) => {
    const { videoId, playlistId } = req.params;

    if (!videoId || !playlistId) {
        throw new ApiError(
            "Video ID and Playlist ID are required",
            400
        )
    }

    const playlist = await PlaylistModel.findById(playlistId);

    if (!playlist) {
        throw new ApiError(
            "Playlist not found",
            404
        )
    }

    if (!playlist.videos.includes((new mongoose.Schema.ObjectId(videoId)))) {
        throw new ApiError(
            "Video not in playlist",
            400
        )
    }

    playlist.videos = playlist.videos.filter((video) => {
        return video.toString() !== videoId
    })

    await playlist.save();

    return res.status(200)
        .json(
            new ApiResponse<PlaylistInterface>(
                true,
                playlist,
                "Video removed from playlist"
            )
        )
})