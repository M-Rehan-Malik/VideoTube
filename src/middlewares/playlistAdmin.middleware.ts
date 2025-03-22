import { PlaylistModel } from "../models/Playlist.model";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";


export const playlistAdminMiddleware = asyncHandler(
    async (req, _, next) => {
        const authRequest = req as AuthenticatedRequest
        if (!authRequest.user || !authRequest.user?._id) {
            throw new ApiError(
                "Unauthorized",
                401
            )
        }

        const { id: playlistId } = req.params;

        if (!playlistId) {
            throw new ApiError(
                "Playlist ID is required",
                400
            )
        }

        const playlist = await PlaylistModel.findById(playlistId).select("owner");

        if (!playlist) {
            throw new ApiError(
                "Playlist not found",
                404
            )
        }

        if (playlist.owner.toString() !== authRequest.user._id.toString()) {
            throw new ApiError(
                "Unauthorized",
                401
            )
        }

        next();
    }
)