import { GetProducts } from '../actions/get-products';
import ProductsGrid from './products-grid';

export default async function Products() {
  const products = await GetProducts();

  return <ProductsGrid products={products} />;
}
