import { UserInterface, UserModel } from "../models/User.model";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { DecodedToken } from "../types/DecodedToken";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const authMiddleware = asyncHandler(
    async (req, _, next) => {
        const token = req.cookies?.accessToken;

        if (!token) {
            throw new ApiError(
                "Unauthorized", 
                401, 
                "Access Token is missing in request cookies"
            )
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as DecodedToken;

        const user = await UserModel.findById<UserInterface>(decodedToken?._id);

        if (!user) {
            throw new ApiError(
                "Unauthorized",
                401,
                "User not found in database"
            )
        }

        (req as AuthenticatedRequest).user = user;

        next();

    }
)