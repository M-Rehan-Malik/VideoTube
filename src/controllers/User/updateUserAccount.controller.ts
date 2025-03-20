import { UserInterface, UserModel } from "../../models/User.model";
import { updateUserAccountSchema } from "../../schemas/User/updateUserAccount.schema";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const updateUserAccountController = asyncHandler(async (req, res) => {
    const credentials = req.body;

    const validationResult = updateUserAccountSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { fullName } = validationResult.data

    const userId = (req as AuthenticatedRequest).user?._id

    if (!userId) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
        $set: {
            fullName
        }
    }, {
        new: true
    });

    if (!updatedUser) {
        throw new ApiError(
            "User not found",
            400
        )
    }

    const userToSend = {
        ...updatedUser.toObject(),
        password: "",
        refreshToken: ""
    }

    return res.status(200).json(
        new ApiResponse<UserInterface>(
            true,
            userToSend,
            "User updated successfully"
        )
    )
})