import { PlaylistInterface, PlaylistModel } from "../../models/Playlist.model";
import { createPlaylistSchema } from "../../schemas/Playlist/createPlaylist.schema";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const createPlaylistController = asyncHandler(async (req, res) => {
    const credentials = req.body;

    const validationResult = createPlaylistSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { name, description } = validationResult.data;

    const createdPlaylist = await PlaylistModel.create({
        name,
        description,
        videos: [],
        owner: (req as AuthenticatedRequest).user?._id
    });

    if (!createdPlaylist) {
        throw new ApiError(
            "Error while creating playlist",
            500
        )
    }

    return res.status(200)
    .json(
        new ApiResponse<PlaylistInterface>(
            true,
            createdPlaylist,
            "Created Playlist Successfully"
        )
    )
})