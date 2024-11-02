import { z } from 'zod';

// es una validacion por cada tipo de accion
export const saveExampleSchema = z.object({
    title: z.string({
        required_error: 'Title is required'
    }),
    description: z.string({
        required_error: 'Description is required'
    }),
    date: z.string().datetime().optional(),
});