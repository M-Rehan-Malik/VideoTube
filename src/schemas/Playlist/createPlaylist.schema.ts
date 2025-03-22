import { z } from "zod";


export const playlistNameValidation = z.string({
    message: 'Playlist name is required'
})
    .trim()
    .min(3, {
        message: 'Playlist name must be at least 3 characters long'
    })
    .max(100, {
        message: 'Playlist name must be at most 100 characters long'
    })

export const playlistDescriptionValidation = z.string({
    message: 'Playlist description is required'
})
    .trim()
    .min(3, {
        message: 'Playlist description must be at least 3 characters long'
    })
    .max(1000, {
        message: 'Playlist description must be at most 1000 characters long'
    })


export const createPlaylistSchema = z.object({
    name: playlistNameValidation,
    description: playlistDescriptionValidation
})