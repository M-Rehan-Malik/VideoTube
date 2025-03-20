import mongoose from "mongoose";
import { UserModel } from "../../models/User.model";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";

export const getWatchHistoryController = asyncHandler(async (req, res) => {
    const userId = (req as AuthenticatedRequest)?.user?._id;

    if (!userId) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    const watchHistory = (await UserModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ]))[0].watchHistory;

    if (!watchHistory) {
        throw new ApiError(
            "Watch History not found",
            404
        )
    }

    return res.status(200)
        .json(
            new ApiResponse<object>(
                true,
                watchHistory,
                "Fetched user watch history successfully"
            )
        )
})