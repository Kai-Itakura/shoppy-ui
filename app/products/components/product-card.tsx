import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { API_URL } from '@/constants/api';
import Image from 'next/image';
import { FormattedProduct } from '../interfaces/product.type';

export default function ProductCard({ id, name, description, price }: FormattedProduct) {
  return (
    <Card className='w-full sm:w1/2 md:1/3 lg:1/4 xl:1/5'>
      <CardHeader>
        <Image
          className='w-full h-auto aspect-square object-cover object-center'
          src={`${API_URL}/products/${id}.jpeg`}
          width={0}
          height={0}
          sizes='50vw'
          alt='Product image'
        />
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>￥{price}</p>
      </CardContent>
    </Card>
  );
}
