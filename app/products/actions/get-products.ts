'use server';

import { get } from '@/app/util/fetch';
import { redirect } from 'next/navigation';
import { FormattedProduct, Product } from '../interfaces/product.type';

export async function GetProducts(): Promise<FormattedProduct[]> {
  const res = await get('products', undefined, ['products']);
  if (!res.ok) {
    if (res.status === 401) redirect('login');
  }

  const products = (await res.json()) as Product[];

  const formattedProducts = products.map((product) => {
    const localPrice = product.price.toLocaleString();
    return {
      ...product,
      price: localPrice,
    };
  });

  return formattedProducts;
}
