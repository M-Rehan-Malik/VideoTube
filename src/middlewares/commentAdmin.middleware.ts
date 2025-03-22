import { CommentModel } from "../models/Comment.model";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";


export const commentAdminmiddleware = asyncHandler(
    async (req, _, next) => {
        const authRequest = req as AuthenticatedRequest;
        if (!authRequest.user || !authRequest.user?._id) {
            throw new ApiError(
                "Unauthorized",
                401
            )
        }

        const { id } = req.params;

        if (!id) {
            throw new ApiError(
                "Comment ID is required",
                400
            )
        }

        const comment = await CommentModel.findById(id).select("owner");

        if (!comment) {
            throw new ApiError(
                "Comment not found",
                400
            )
        }
        if (comment.owner.toString() !== authRequest.user._id.toString()) {
            throw new ApiError(
                "Unauthorized",
                401
            )
        }

        next();
    }
)