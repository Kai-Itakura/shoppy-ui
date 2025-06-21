'use server';

import { post } from '@/app/util/fetch';

export const checkout = async (productId: number) => {
  const res = await post('checkout/session', { productId });
  return await res.json();
};
