import { TweetModel } from "../models/Tweet.model";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";


export const tweetAdminMiddleware = asyncHandler(
    async (req, _, next) => {
        const authRequest = req as AuthenticatedRequest;
        if (!authRequest.user || !authRequest.user?._id) {
            throw new ApiError(
                "Unauthorized",
                401
            )
        }

        const { id } = req.params;

        if (!id) {
            throw new ApiError(
                "Tweet ID is required",
                400
            )
        }

        const tweet = await TweetModel.findById(id).select("owner");

        if (!tweet) {
            throw new ApiError(
                "Tweet not found",
                400
            )
        }
        if (tweet.owner.toString() !== authRequest.user._id.toString()) {
            throw new ApiError(
                "Unauthorized",
                401
            )
        }

        next();
    }
)