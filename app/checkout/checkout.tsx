'use client';

import { Button } from '@/components/ui/button';
import { checkout } from './actions/checkouot';
import { getStripe } from './stripe';

const Checkout = ({ productId }: { productId: number }) => {
  const handleButtonClick = async () => {
    const session = await checkout(productId);
    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <Button
      size='sm'
      onClick={handleButtonClick}
    >
      Buy now
    </Button>
  );
};

export default Checkout;
