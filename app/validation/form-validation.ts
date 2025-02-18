import { SafeParseReturnType, z, ZodType } from 'zod';

export function validateFormData<T extends ZodType, B extends string>(
  formData: FormData,
  schema: z.ZodBranded<T, B>
): SafeParseReturnType<T['_input'], z.ZodBranded<T, B>['_output']> {
  const data = Object.fromEntries(formData);
  return schema.safeParse(data);
}
