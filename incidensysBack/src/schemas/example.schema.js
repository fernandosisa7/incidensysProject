import { z } from 'zod';

// es una validacion por cada tipo de accion
export const saveExampleSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    }),
    description: z.string({
        required_error: 'Description must be a string'
    }),
    date: z.string().datetime().optional(),
});
