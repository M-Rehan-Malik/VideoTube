import { TweetInterface, TweetModel } from "../../models/Tweet.model";
import { createTweetSchema } from "../../schemas/Tweet/createTweet.schema";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const createTweetController = asyncHandler(async (req, res) => {
    const credentials = req.body;

    const validationResult = createTweetSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { content } = validationResult.data;

    const tweet = await TweetModel.create({
        content,
        owner: (req as AuthenticatedRequest).user?._id
    });

    if (!tweet) {
        throw new ApiError(
            "Failed to create tweet",
            500
        )
    }

    return res.status(200)
        .json(
            new ApiResponse<TweetInterface>(
                true,
                tweet,
                "Tweet created successfully"
            )
        )
})