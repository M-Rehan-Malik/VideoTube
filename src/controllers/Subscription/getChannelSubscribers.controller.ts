import mongoose from "mongoose";
import { SubscriiptionInterface, SubscriptionModel } from "../../models/Subscription.model";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";


export const getChannelSubscribersController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "Channel ID is required",
            400
        )
    }

    const subscribers = await SubscriptionModel.find({ channel: new mongoose.Types.ObjectId(id) });

    if (!subscribers || !subscribers.length) {
        throw new ApiError(
            "Channel subscribers not found",
            400
        )
    }

    return res.status(200)
        .json(
            new ApiResponse<SubscriiptionInterface[]>(
                true,
                subscribers,
                "Fetched channel subscribers successfully"
            )
        )
})