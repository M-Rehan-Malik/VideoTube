import { z } from "zod";
import { fullNameValidation } from "./createUser.schema";


export const updateUserAccountSchema = z.object({
    fullName: fullNameValidation
})