import { cookieOptions } from "../../constants";
import { UserModel } from "../../models/User.model";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const logoutUserController = asyncHandler(async (req, res) => {
    const userId = (req as AuthenticatedRequest).user?._id

    if (!userId) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    await UserModel.findByIdAndUpdate(userId, {
        refreshToken: ""
    });

    return res.status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(true, null, "Logout successful"));
})