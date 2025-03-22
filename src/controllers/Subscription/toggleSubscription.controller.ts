import mongoose from "mongoose";
import { SubscriptionModel } from "../../models/Subscription.model";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiResponse } from "../../utils/ApiResponse";


export const toggleSubscriptionController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "Channel ID Required",
            400
        )
    }

    const subscriptionExists = (await SubscriptionModel.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(id),
                subscriber: new mongoose.Types.ObjectId((req as AuthenticatedRequest).user?._id)
            }
        }
    ]))[0];

    if (subscriptionExists) {

        await SubscriptionModel.findByIdAndDelete(subscriptionExists._id);

        return res.status(200).json(
            new ApiResponse<null>(
                true,
                null,
                "Successfully unsubscribed"
            )
        )
    } else {
        
        await SubscriptionModel.create({
            channel: new mongoose.Types.ObjectId(id),
            subscriber: new mongoose.Types.ObjectId((req as AuthenticatedRequest).user?._id)
        })

        return res.status(200).json(
            new ApiResponse<null>(
                true,
                null,
                "Successfully subscribed"
            )
        )
    }

})