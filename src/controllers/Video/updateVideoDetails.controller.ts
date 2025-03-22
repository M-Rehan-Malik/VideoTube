import { VideoInterface, VideoModel } from "../../models/Video.model";
import { updateVideoDetailsSchema } from "../../schemas/Video/updateVideoDetails.schema";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const updateVideoDetailsController = asyncHandler(async (req, res) => {
    const credentials = req.body;

    const validationResult = updateVideoDetailsSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { title, description } = validationResult.data;

    const videoId = req.params.id;

    if (!videoId) {
        throw new ApiError(
            "Video ID is required",
            400
        )
    }

    const updatedVideo = await VideoModel.findByIdAndUpdate(videoId, {
        $set: {
            title,
            description
        }
    }, {
        new: true
    });

    if (!updatedVideo) {
        throw new ApiError(
            "Failed to update video",
            500
        )
    }

    return res.status(200)
        .json(
            new ApiResponse<VideoInterface>(
                true,
                updatedVideo,
                "Video updated successfully"
            )
        )
})