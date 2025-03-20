import { UserModel } from "../../models/User.model";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { deleteFromCloudinary, uploadToCloudinary } from "../../utils/cloudinary";

export const updateUserCoverImageController = asyncHandler(async (req, res) => {
    const userId = (req as AuthenticatedRequest).user?._id;

    if (!userId) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    const user = await UserModel.findById(userId)
        .select(
            "coverImage"
        );

    if (!user) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    if (user.coverImage) {
        // coverImage is like this https://res.cloudinary.com/string/image/upload/string/id.jpg
        const oldCoverImageURLArray = user.coverImage.split("/");

        const oldCoverImageID = oldCoverImageURLArray[oldCoverImageURLArray.length - 1].split(".")[0];

        await deleteFromCloudinary(oldCoverImageID);
    }

    if (!req.file) {
        throw new ApiError(
            "Cover Image not found",
            400
        )
    }

    const coverImageLocalPath = req.file.path

    const coverImageCloudinaryPath = await uploadToCloudinary(coverImageLocalPath);

    if (!coverImageCloudinaryPath) {
        throw new ApiError(
            "Failed to upload cover image to cloudinary",
            500
        )
    }

    const newCoverImageURL = coverImageCloudinaryPath.secure_url;

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
        $set: {
            coverImage: newCoverImageURL
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
                newCoverImageURL,
                "Cover Image updated successfully"
            )
        )
})