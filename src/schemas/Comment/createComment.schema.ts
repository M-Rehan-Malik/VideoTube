import { z } from "zod";
import { tweetContentValidation } from "../Tweet/createTweet.schema";


export const createCommentSchema = z.object({
    content: tweetContentValidation
})