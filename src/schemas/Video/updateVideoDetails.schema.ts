import { z } from "zod";
import { descriptionValidation, titleValidation } from "./publishVideo.schema";


export const updateVideoDetailsSchema = z.object({
    title: titleValidation,
    description: descriptionValidation
})