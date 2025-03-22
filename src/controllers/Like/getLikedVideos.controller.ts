import mongoose from "mongoose";
import { LikeModel } from "../../models/Like.model";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { VideoInterface } from "../../models/Video.model";


export const getLikedVideosController = asyncHandler(async (req, res) => {
    const videos = await LikeModel.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId((req as AuthenticatedRequest).user?._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                foreignField: "_id",
                localField: "likedAt",
                as: "videos"
            }
        }
    ]);

    if (!videos || !videos.length) {
        throw new ApiError(
            "No videos found",
            404
        )
    }

    return res.status(200)
    .json(
        new ApiResponse<VideoInterface[]>(
            true,
            videos,
            "Videos fetched successfully"
        )
    )
})