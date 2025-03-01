'use server';

import { post } from '@/app/util/fetch';
import { validateFormData } from '@/app/validation/form-validation';
import { FormState } from '@/constants/action-status';
import { createProductSchema } from '../schema/create-product.schema';

export async function createProduct(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = validateFormData(formData, createProductSchema);
  if (parsed.error) {
    return {
      status: FORM_STATUS.ERROR,
      message: parsed.error.errors[0].message,
    };
  }

  const res = await post('products', parsed.data);
  if (!res.ok) {
    return {
      status: FORM_STATUS.ERROR,
      message: 'Failed to create product!',
    };
  }

  return {
    status: FORM_STATUS.SUCCESS,
    message: 'Successfully created!',
  };
}
