import { z } from "zod";
import { passwordValidation } from "./createUser.schema";


export const changePasswordSchema = z.object({
    oldPassword: z.string({
        message: 'Old password is required'
    })
        .trim(),
    newPassword: passwordValidation
})