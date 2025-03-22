import { z } from "zod";


export const titleValidation = z.string({
    message: 'Title is required'
})
    .trim()
    .min(3, {
        message: 'Title must be at least 3 characters long'
    })
    .max(100, {
        message: 'Title must be at most 100 characters long'
    })

export const descriptionValidation = z.string({
    message: 'Description is required'
})
    .trim()
    .min(3, {
        message: 'Description must be at least 3 characters long'
    })
    .max(1000, {
        message: 'Description must be at most 1000 characters long'
    })

    
export const publishVideoSchema = z.object({
    title: titleValidation,
    description: descriptionValidation,
    isPublished: z.enum(
        ['true', 'false'],
        {
            required_error: 'Is published is required',
            invalid_type_error: 'Is published must be true or false'
        }
    )
})