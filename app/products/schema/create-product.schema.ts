import { z } from 'zod';

const IMAGE_TYPE = 'image/jpeg';
const MAX_IMAGE_SIZE = 5;

const byteToMB = (size: number, decimalNum = 2) => {
  const result = size / (1024 * 1024);
  return Number(result.toFixed(decimalNum));
};

export const createProductSchema = z
  .object({
    name: z.string().min(1, 'Name is required!'),
    description: z.string().min(1, 'Description is required!'),
    price: z.preprocess((string) => Number(string), z.number().positive('Price must be greater than 0!')),
    image: z
      .instanceof(File)
      .refine((file) => byteToMB(file.size) < MAX_IMAGE_SIZE, { message: 'File size must be least 5MB!' })
      .refine((file) => file.type === IMAGE_TYPE, { message: 'Only JPEG image is allowed!' }),
  })
  .brand('create-form-schema');

export type CreateProductSchema = z.infer<typeof createProductSchema>;
