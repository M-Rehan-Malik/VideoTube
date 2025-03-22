import { z } from "zod";
import { playlistDescriptionValidation, playlistNameValidation } from "./createPlaylist.schema";


export const updatePlaylistSchema = z.object({
    name: playlistNameValidation,
    description: playlistDescriptionValidation
})