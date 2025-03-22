import { VideoInterface, VideoModel } from "../../models/Video.model";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const getVideoController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "Video ID is required",
            400
        )
    }

    const video = await VideoModel.findById(id);

    if (!video) {
        throw new ApiError(
            "Video not found",
            400
        )
    }

    return res.status(200)
    .json(
        new ApiResponse<VideoInterface>(
            true,
            video,
            "Video fetched successfully"
        )
    )
}) 