import { get } from '@/app/util/fetch';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { FormattedProduct, Product } from '../../interfaces/product.type';
import { formatPrice } from '../../util/formatPrice';

export default async function getProduct(productId: string): Promise<FormattedProduct> {
  const res = await get(`products/${productId}`);

  if (!res.ok) {
    if (res.status === 401) redirect('login');
    if (res.status === 403) {
      revalidateTag('product');
      redirect('/');
    }
  }

  const product = (await res.json()) as Product;

  return { ...product, price: formatPrice(product.price) };
}
