'use client';

import { API_URL } from '@/constants/api';
import Link from 'next/link';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import revalidateProducts from '../actions/revalidate-products';
import { FormattedProduct } from '../interfaces/product.type';
import ProductCard from './product-card';

const ProductsGrid = ({ products }: { products: FormattedProduct[] }) => {
  useEffect(() => {
    const socket = io(API_URL);
    socket.on('productUpdated', () => {
      revalidateProducts();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {products.map((product) => (
        <Link
          href={`/products/${product.id}`}
          key={product.id}
        >
          <ProductCard
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductsGrid;
