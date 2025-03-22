import { TweetModel } from "../../models/Tweet.model";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const deleteTweetController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "Tweet ID is required",
            400
        )
    }

    const deletedTweet = await TweetModel.findByIdAndDelete(id);

    if (!deletedTweet) {
        throw new ApiError(
            "Tweet not found",
            404
        )
    }

    return res.status(200)
    .json(
        new ApiResponse<null>(
            true,
            null,
            "Tweet deleted successfully"
        )
    )
})