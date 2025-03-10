'use server';

import { getHeaders, post } from '@/app/util/fetch';
import { validateFormData } from '@/app/validation/form-validation';
import { FORM_STATUS, FormState } from '@/constants/action-status';
import { API_URL } from '@/constants/api';
import { revalidateTag } from 'next/cache';
import { createProductSchema } from '../schema/create-product.schema';

export async function createProduct(_state: FormState, formData: FormData): Promise<FormState> {
  const parsed = validateFormData(formData, createProductSchema);
  if (parsed.error) {
    return {
      status: FORM_STATUS.ERROR,
      message: parsed.error.errors[0].message,
    };
  }

  const { image, ...productData } = parsed.data;

  const res = await post('products', productData);
  if (!res.ok) {
    return {
      status: FORM_STATUS.ERROR,
      message: 'Failed to create product!',
    };
  }

  const product = (await res.json()) as { id: number };

  const response = await uploadImage(product.id, image);
  if (!response.ok) {
    return {
      status: FORM_STATUS.ERROR,
      message: 'Failed to upload image!',
    };
  }

  revalidateTag('product');

  return {
    status: FORM_STATUS.SUCCESS,
    message: 'Successfully created!',
  };
}

async function uploadImage(productId: number, file: File): Promise<Response> {
  const formData = new FormData();
  formData.append('image', file);
  return fetch(`${API_URL}/products/${productId}/image`, {
    body: formData,
    method: 'POST',
    headers: await getHeaders(),
  });
}
