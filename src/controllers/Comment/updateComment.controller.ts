import mongoose from "mongoose";
import { CommentInterface, CommentModel } from "../../models/Comment.model";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiResponse } from "../../utils/ApiResponse";
import { updateCommentSchema } from "../../schemas/Comment/updateComment.schema";


export const updateCommentController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "id is required",
            400
        )
    }

    const credentials = req.body;

    const validationResult = updateCommentSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { content } = validationResult.data;

    const updatedComment = await CommentModel.findByIdAndUpdate(id, {
        $set: {
            content
        },
    }, {
        new: true
    });

    if (!updatedComment) {
        throw new ApiError(
            "Failed to update comment",
            500
        )
    }

    return res.status(200)
    .json(
        new ApiResponse<CommentInterface>(
            true,
            updatedComment,
            "Comment updated successfully"
        )
    )
})