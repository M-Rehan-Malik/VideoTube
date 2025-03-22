import { VideoModel } from "../models/Video.model";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";


export const videoAdminMiddleware = asyncHandler(
    async (req, _, next) => {
        const authRequest = req as AuthenticatedRequest
        if (!authRequest.user || !authRequest.user?._id) {
            throw new ApiError(
                "Unauthorized",
                401
            )
        }

        const { id: videoId } = req.params;

        if (!videoId) {
            throw new ApiError(
                "Video ID is required",
                400
            )
        }

        const video = await VideoModel.findById(videoId).select("owner");

        if (!video) {
            throw new ApiError(
                "Video not found",
                400
            )
        }

        if (video.owner.toString() !== authRequest.user._id.toString()) {
            throw new ApiError(
                "Unauthorized",
                401
            )
        }

        next()
    }
)