import { generateAccessAndRefreshTokens } from ".";
import { cookieOptions } from "../../constants";
import { UserInterface, UserModel } from "../../models/User.model";
import { createUserSchema } from "../../schemas/User/createUser.schema";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";
import { uploadToCloudinary } from "../../utils/cloudinary";

export const registerUserController = asyncHandler(async (req, res) => {
    const credentials = req.body;

    const validationResult = createUserSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { username, email, fullName, password } = validationResult.data;

    const userExists = await UserModel.findOne({
        $or: [{ username }, { email }]
    });

    if (userExists) {
        throw new ApiError(
            "User already exists",
            400
        )
    }

    const files = req.files as {
        avatar?: Express.Multer.File[],
        coverImage?: Express.Multer.File[]
    };

    const { avatar, coverImage } = files;

    if (!avatar || !avatar?.[0] || !avatar?.[0]?.path) {
        throw new ApiError(
            "Avatar is required",
            400
        )
    }

    const avatarLocalPath = avatar?.[0]?.path

    const avatarCloudinaryPath = await uploadToCloudinary(avatarLocalPath);

    if (!avatarCloudinaryPath) {
        throw new ApiError(
            "Failed to upload avatar to cloudinary",
            500
        )
    }

    const avatarURL = avatarCloudinaryPath.secure_url;

    let coverImageURL: string | null;
    if (!coverImage || !coverImage?.[0] || !coverImage?.[0]?.path) {
        coverImageURL = null
    }
    else {
        const coverImageLocalPath = coverImage?.[0]?.path

        const coverImageCloudinaryPath = await uploadToCloudinary(coverImageLocalPath);

        if (!coverImageCloudinaryPath) {
            throw new ApiError(
                "Failed to upload cover image to cloudinary",
                500
            )
        }

        coverImageURL = coverImageCloudinaryPath.secure_url;
    }

    const createdUser = await UserModel.create({
        username,
        email,
        fullName,
        password,
        avatar: avatarURL,
        coverImage: coverImageURL,
        refreshToken: "hi"
    });

    if (!createdUser) {
        throw new ApiError(
            "Failed to create user",
            500
        )
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(createdUser._id);

    const userToSend = {
        ...createdUser.toObject(),
        _id: createdUser._id.toString(),
        password: "",
        refreshToken: ""
    }

    return res.status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse<UserInterface>(
                true,
                userToSend,
                "User created successfully"
            )
        )
});
