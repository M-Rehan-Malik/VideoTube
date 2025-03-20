import { UserModel } from "../../models/User.model";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { deleteFromCloudinary, uploadToCloudinary } from "../../utils/cloudinary";

export const updateUserAvatarController = asyncHandler(async (req, res) => {
    const userId = (req as AuthenticatedRequest).user?._id;

    if (!userId) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    const user = await UserModel.findById(userId)
        .select(
            "avatar"
        );

    if (!user) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    // avatar is like this https://res.cloudinary.com/string/image/upload/string/id.jpg
    const oldAvatarURLArray = user.avatar.split("/");

    const oldAvatarID = oldAvatarURLArray[oldAvatarURLArray.length - 1].split(".")[0];

    await deleteFromCloudinary(oldAvatarID);

    if (!req.file) {
        throw new ApiError(
            "Avatar not found",
            400
        )
    }

    const avatarLocalPath = req.file.path

    const avatarCloudinaryPath = await uploadToCloudinary(avatarLocalPath);

    if (!avatarCloudinaryPath) {
        throw new ApiError(
            "Failed to upload avatar to cloudinary",
            500
        )
    }

    const newAvatarURL = avatarCloudinaryPath.secure_url;

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
        $set: {
            avatar: newAvatarURL
        }
    }, {
        new: true
    })

    if (!updatedUser) {
        throw new ApiError(
            "Failed to update user",
            500
        )
    }

    return res.status(200)
        .json(
            new ApiResponse<string>(
                true,
                newAvatarURL,
                "Avatar updated successfully"
            )
        )
})