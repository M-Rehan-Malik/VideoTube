import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { TweetInterface, TweetModel } from "../../models/Tweet.model";
import { ApiResponse } from "../../utils/ApiResponse";


export const getUserTweetsController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "User ID is required",
            400
        )
    }

    const tweets = await TweetModel.find({ owner: new mongoose.Types.ObjectId(id) })

    if (!tweets || !tweets.length) {
        throw new ApiError(
            "User tweets not found",
            400
        )
    }

    return res.status(200)
        .json(
            new ApiResponse<TweetInterface[]>(
                true,
                tweets,
                "Fetched user tweets successfully"
            )
        )
})