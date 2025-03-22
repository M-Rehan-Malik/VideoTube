import mongoose from "mongoose";
import { SubscriiptionInterface, SubscriptionModel } from "../../models/Subscription.model";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";


export const getSubscribedChannelsController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "User ID is required",
            400
        )
    }

    const channels = await SubscriptionModel.find({ subscriber: new mongoose.Types.ObjectId(id) });

    if (!channels || !channels.length) {
        throw new ApiError(
            "User channels not found",
            400
        )
    }

    return res.status(200)
        .json(
            new ApiResponse<SubscriiptionInterface[]>(
                true,
                channels,
                "Channels found"
            )
        )
})