import { UserModel } from "../../models/User.model";
import { changePasswordSchema } from "../../schemas/User/changePassword.schema";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import bcrypt from "bcryptjs"

export const changePasswordController = asyncHandler(async (req, res) => {
    const credentials = req.body;

    const validationResult = changePasswordSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { oldPassword, newPassword } = validationResult.data;

    const userId = (req as AuthenticatedRequest).user?._id;

    if (!userId) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    const user = await UserModel.findById(userId).select(
        "password"
    );

    if (!user) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
        throw new ApiError(
            "Incorrect old password",
            400
        )
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    return res.status(200)
        .json(new ApiResponse(true, null, "Password changed successfully"));

})