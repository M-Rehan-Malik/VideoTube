import mongoose from "mongoose";
import { CommentInterface, CommentModel } from "../../models/Comment.model";
import { createCommentSchema } from "../../schemas/Comment/createComment.schema";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiResponse } from "../../utils/ApiResponse";


export const createCommentController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "id is required",
            400
        )
    }

    const credentials = req.body;

    const validationResult = createCommentSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { content } = validationResult.data;

    const createdComment = await CommentModel.create({
        content,
        video: new mongoose.Types.ObjectId(id),
        owner: new mongoose.Types.ObjectId((req as AuthenticatedRequest).user?._id)
    });

    if (!createdComment) {
        throw new ApiError(
            "Failed to create comment",
            500
        )
    }

    return res.status(200)
    .json(
        new ApiResponse<CommentInterface>(
            true,
            createdComment,
            "Comment created successfully"
        )
    )
})