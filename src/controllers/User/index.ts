import { UserModel } from "../../models/User.model";
import { ApiError } from "../../utils/ApiError";
import { changePasswordController } from "./changePassword.controller";
import { getCurrentUserController } from "./getCurrentUser.controller";
import { loginUserController } from "./loginUser.controller";
import { logoutUserController } from "./logoutUser.controller";
import { registerUserController } from "./registerUser.controller";
import jwt from "jsonwebtoken"
import { updateUserAccountController } from "./updateUserAccount.controller";
import { updateUserAvatarController } from "./updateUserAvatar.controller";
import { updateUserCoverImageController } from "./updateUserCoverImage.controller";
import { getUserChannelProfileController } from "./getUserChannelProfile.controller";
import { getWatchHistoryController } from "./getWatchHistory.controller";

export const generateAccessAndRefreshTokens = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET!);

        const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET!);

        user.refreshToken = refreshToken

        await user.save({
            validateBeforeSave: false
        });

        return { accessToken, refreshToken }
    } catch (error: any) {
        throw new ApiError(
            "Something went wrong while generating refresh token",
            500
        )
    }
}

export { 
    registerUserController, 
    loginUserController, 
    logoutUserController, 
    changePasswordController, 
    getCurrentUserController, 
    updateUserAccountController, 
    updateUserAvatarController,
    updateUserCoverImageController,
    getUserChannelProfileController,
    getWatchHistoryController
};