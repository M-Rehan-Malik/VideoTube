import { generateAccessAndRefreshTokens } from ".";
import { cookieOptions } from "../../constants";
import { UserModel } from "../../models/User.model";
import { loginUserSchema } from "../../schemas/User/loginUser.schema";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import bcrypt from "bcryptjs"

export const loginUserController = asyncHandler(async (req, res) => {
    const credentials = req.body;

    const validationResult = loginUserSchema.safeParse(credentials);
    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { email, password } = validationResult.data;

    const userExists = await UserModel.findOne({
        email
    });

    if (!userExists) {
        throw new ApiError(
            "User does not exist",
            400
        )
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExists.password);

    if (!isPasswordCorrect) {
        throw new ApiError(
            "Incorrect password",
            400
        )
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(userExists._id);

    return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(true, null, "Login successful"));

})