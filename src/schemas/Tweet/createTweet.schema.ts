import { z } from "zod";


export const tweetContentValidation = z.string({
    message: 'Tweet content is required'
})
    .trim()
    .min(3, {
        message: 'Tweet content must be at least 3 characters long'
    })
    .max(1000, {
        message: 'Tweet content must be at most 1000 characters long'
    })


export const createTweetSchema = z.object({
    content: tweetContentValidation
})