import { PlaylistInterface, PlaylistModel } from "../../models/Playlist.model";
import { updatePlaylistSchema } from "../../schemas/Playlist/updatePlaylist.schema";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asyncHandler";


export const updatePlaylistController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(
            "Playlist ID is required",
            400
        )
    }

    const credentials = req.body;

    const validationResult = updatePlaylistSchema.safeParse(credentials);

    if (!validationResult.success) {
        throw new ApiError(
            validationResult.error.errors[0].message,
            400
        )
    }

    const { name, description } = validationResult.data;

    const updatedPlaylist = await PlaylistModel.findByIdAndUpdate(id, {
        $set: {
            name,
            description
        }
    }, {
        new: true
    });

    if (!updatedPlaylist) {
        throw new ApiError(
            "Failed to update playlist",
            400
        )
    }

    return res.status(200)
        .json(
            new ApiResponse<PlaylistInterface>(
                true,
                updatedPlaylist,
                "Playlist updated successfully"
            )
        )
})