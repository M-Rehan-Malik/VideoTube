import { UserModel } from "../../models/User.model";
import { createUserSchema } from "../../schemas/User/createUser.schema";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";

export const registerUserController = asyncHandler(async (req, res) => {
const credentials = req.body;
// console.log(req);

    // console.log(credentials)

    const validationResult = createUserSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400,
            "Invalid request data came from frontend"
        )
    }

    const { username, email, fullName, password } = credentials;

    const userExists = await UserModel.findOne({
        $or: [{ username }, { email }]
    });

    if (userExists) {
        throw new ApiError(
            "User already exists",
            400,
            "User already exists in database"
        )
    }

    const avatarLocalPath = req.files;
    // console.log(avatarLocalPath)
    // const coverImageLocalPath = req.files?.coverImage[0].path;

    res
});
