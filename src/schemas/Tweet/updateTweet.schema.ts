import { z } from "zod";
import { tweetContentValidation } from "./createTweet.schema";


export const updateTweetSchema = z.object({
    content: tweetContentValidation
});