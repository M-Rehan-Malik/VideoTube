import { UserInterface, UserModel } from "../../models/User.model";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const getCurrentUserController = asyncHandler(async (req, res) => {
    const userId = (req as AuthenticatedRequest).user?._id;

    if (!userId) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    const user = await UserModel.findById(userId)
    .select(
        "-password -refreshToken"
    );

    if (!user) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    return res.status(200).json(
        new ApiResponse<UserInterface>(true, user, "User found")
    )
})