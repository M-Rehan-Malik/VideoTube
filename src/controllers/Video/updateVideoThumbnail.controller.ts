import { VideoInterface, VideoModel } from "../../models/Video.model";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { deleteFromCloudinary, uploadToCloudinary } from "../../utils/cloudinary";
import { extractFileID } from "../../utils/extractFileID";


export const updateVideoThumbnailController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const video = await VideoModel.findById(id);

    if (!video) {
        throw new ApiError(
            "Video not found",
            404
        )
    }

    const thumbnailID = extractFileID(video.thumbnail)
    await deleteFromCloudinary(thumbnailID)

    const thumbnail = req.file;
    
    if (!thumbnail || !thumbnail.path) {
        throw new ApiError(
            "Thumbnail is required",
            400
        )
    }

    const uploadedThumbnail = await uploadToCloudinary(thumbnail.path);

    if (!uploadedThumbnail) {
        throw new ApiError(
            "Failed to upload thumbnail",
            500
        )
    }

    video.thumbnail = uploadedThumbnail.secure_url;

    await video.save();

    return res.status(200)
        .json(
            new ApiResponse<VideoInterface>(
                true,
                video,
                "Thumbnail updated successfully"
            )
        )
})