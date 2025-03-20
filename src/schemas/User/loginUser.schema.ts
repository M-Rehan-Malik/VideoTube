import { z } from "zod";

export const loginUserSchema = z.object({
    email: z.string({
        message: 'Email is required'
    })
        .trim()
        .toLowerCase()
        .email({
            message: 'Invalid email address'
        }),
    password: z.string({
        message: 'Password is required'
    })
        .trim()
})