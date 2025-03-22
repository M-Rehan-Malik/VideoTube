import { TweetInterface, TweetModel } from "../../models/Tweet.model";
import { updateTweetSchema } from "../../schemas/Tweet/updateTweet.schema";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const updateTweetController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "Tweet ID is required",
            400
        )
    }

    const credentials = req.body;

    const validationResult = updateTweetSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { content } = validationResult.data;

    const tweet = await TweetModel.findByIdAndUpdate(id, {
        $set: {
            content
        }
    }, {
        new: true
    });

    if (!tweet) {
        throw new ApiError(
            "Failed to update tweet",
            400
        )
    }

    return res.status(200)
        .json(
            new ApiResponse<TweetInterface>(
                true,
                tweet,
                "Tweet updated successfully"
            )
        )
})