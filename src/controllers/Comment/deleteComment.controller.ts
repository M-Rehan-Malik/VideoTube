import mongoose from "mongoose";
import { CommentInterface, CommentModel } from "../../models/Comment.model";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiResponse } from "../../utils/ApiResponse";


export const deleteCommentController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "id is required",
            400
        )
    }

    const deletedComment = await CommentModel.findByIdAndDelete(id);

    if (!deletedComment) {
        throw new ApiError(
            "Comment not found",
            404
        )
    }

    return res.status(200)
    .json(
        new ApiResponse<null>(
            true,
            null,
            "Comment deleted successfully"
        )
    )
})