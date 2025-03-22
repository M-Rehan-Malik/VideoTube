import mongoose from "mongoose";
import { LikeModel } from "../../models/Like.model";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiResponse } from "../../utils/ApiResponse";


export const toggleLikeController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "Video ID is required",
            400
        )
    }

    const likeExists = await LikeModel.find({
        likedAt: new mongoose.Types.ObjectId(id)
    })

    if (likeExists) {
        await LikeModel.deleteOne({ likedAt: new mongoose.Types.ObjectId(id) });
        return res.status(200)
            .json(
                new ApiResponse<null>(
                    true,
                    null,
                    "Like removed successfully"
                )
            )
    }
    else {
        const createdLike = await LikeModel.create({
            likedAt: new mongoose.Types.ObjectId(id),
            owner: new mongoose.Types.ObjectId((req as AuthenticatedRequest).user?._id)
        });

        if (!createdLike) {
            throw new ApiError(
                "Failed to create like",
                500
            )
        }

        return res.status(200)
            .json(
                new ApiResponse<null>(
                    true,
                    null,
                    "Like created successfully"
                )
            )
    }
})