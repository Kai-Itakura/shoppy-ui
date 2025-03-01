import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormattedProduct } from '../interfaces/product.type';

type ProductCardProps = {} & Omit<FormattedProduct, 'id'>;

export default function ProductCard({ name, description, price }: ProductCardProps) {
  return (
    <Card className='w-full sm:w1/2 md:1/3 lg:1/4 xl:1/5'>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>￥{price}</p>
      </CardContent>
    </Card>
  );
}
