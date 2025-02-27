import { z } from 'zod';

export const authFormSchema = z
  .object({
    email: z.string().email('Invalid email format!'),
    password: z.string().min(12, 'Must be least 12 characters!'),
  })
  .brand('auth-form-schema');

export type AuthFormSchema = z.infer<typeof authFormSchema>;
