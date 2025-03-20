import { z } from 'zod';

export const passwordValidation = z.string({
    message: 'Password is required'
}).trim()
    .min(8, {
        message: 'Password must be at least 8 characters long'
    })
    .max(50, {
        message: 'Password must be at most 50 characters long'
    })

export const fullNameValidation = z.string({
    message: 'Full name is required'
})
    .trim()
    .min(3, {
        message: 'Full name must be at least 3 characters long'
    })
    .max(30, {
        message: 'Full name must be at most 30 characters long'
    })

export const createUserSchema = z.object({
    username: z.string({
        message: 'Username is required'
    })
        .trim()
        .toLowerCase()
        .min(3, {
            message: 'Username must be at least 3 characters long'
        })
        .max(15, {
            message: 'Username must be at most 15 characters long'
        }),
    email: z.string({
        message: 'Email is required'
    })
        .trim()
        .toLowerCase()
        .email({
            message: 'Invalid email address'
        }),
    fullName: fullNameValidation,
    password: passwordValidation,
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
})