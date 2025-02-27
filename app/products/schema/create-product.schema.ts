import { z } from 'zod';

export const createProductSchema = z
  .object({
    name: z.string().min(1, 'Name is required!'),
    description: z.string().min(1, 'Description is required!'),
    price: z.preprocess((string) => Number(string), z.number().positive('Price must be greater than 0!')),
  })
  .brand('create-form-schema');

export type CreateProductSchema = z.infer<typeof createProductSchema>;
