'use server';

import { get } from '@/app/util/fetch';
import { redirect } from 'next/navigation';
import { FormattedProduct, Product } from '../interfaces/product.type';
import { formatPrice } from '../util/formatPrice';

export async function GetProducts(): Promise<FormattedProduct[]> {
  const res = await get('products', undefined, ['products'], new URLSearchParams({ status: 'available' }));
  if (!res.ok) {
    if (res.status === 401) redirect('login');
  }

  const products = (await res.json()) as Product[];

  const formattedProducts = products.map((product) => {
    const localPrice = formatPrice(product.price);
    return {
      ...product,
      price: localPrice,
    };
  });

  return formattedProducts;
}
