import mongoose from "mongoose";
import { CommentInterface, CommentModel } from "../../models/Comment.model";
import { ApiError } from "../../utils/ApiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";


export const getVideoCommentsController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "Id is required",
            400
        )
    }


    const comments = await CommentModel.find({
        video: new mongoose.Types.ObjectId(id)
    });

    if (!comments) {
        throw new ApiError(
            "No comments found",
            404
        )
    }

    return res.status(200)
        .json(
            new ApiResponse<CommentInterface[]>(
                true,
                comments,
                "Commments fetched successfully"
            )
        )
})