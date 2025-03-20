import { UserModel } from "../../models/User.model";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";

interface UserChannelProfile {
    _id: string;
    username: string;
    fullName: string;
    subscribers: number;
    subscribedTo: number;
    avatar: string;
    coverImage: string;
}

export const getUserChannelProfileController = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username) {
        throw new ApiError(
            "Username is required to fetch user channel profile",
            400
        )
    }

    const channel: UserChannelProfile = (await UserModel.aggregate([
        {
            $match: {
                username
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $project: {
                _id: { $toString: "$_id" },
                username: 1,
                fullName: 1,
                subscribers: { $size: "$subscribers" },
                subscribedTo: { $size: "$subscribedTo" },
                avatar: 1,
                coverImage: 1
            }
        }
    ]))[0]

    if (!channel) {
        throw new ApiError("User not found", 404)
    }

    return res.status(200)
        .json(
            new ApiResponse<UserChannelProfile>(
                true,
                channel,
                "User channel profile fetched successfully"
            )
        )
})