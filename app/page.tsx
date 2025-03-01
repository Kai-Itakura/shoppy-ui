import CreateProductModal from './products/components/create/create-product-modal';
import Products from './products/components/products';

export default async function Home() {
  return (
    <div className=' pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='w-full flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Products />
        <CreateProductModal />
      </main>
    </div>
  );
}
