import { GetProducts } from '../actions/get-products';
import ProductCard from './product-card';

export default async function Products() {
  const products = await GetProducts();

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
        />
      ))}
    </div>
  );
}
