import Checkout from '@/app/checkout/checkout';
import Image from 'next/image';
import { getProductImagePath } from '../util/getProductImagePath';
import getProduct from './actions/get-product';

type ProductProps = {
  params: { productId: string };
};

export default async function Product({ params }: ProductProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

  return (
    <div className='flex flex-col sm:flex-row justify-center mt-24 px-10 gap-[10%]'>
      <Image
        src={getProductImagePath(product.id)}
        width={0}
        height={0}
        sizes='70vw'
        alt='Product image'
        className='w-full self-center sm:w-1/3 h-auto aspect-square object-cover'
      />
      <div className='flex-grow flex flex-col gap-4 mt-4'>
        <h2 className='font-bold text-3xl'>{product.name}</h2>
        <p>{product.description}</p>
        <p className='text-lg'>{product.price}</p>
        <Checkout productId={product.id} />
      </div>
    </div>
  );
}
