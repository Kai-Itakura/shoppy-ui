import { ShoppingBagIcon } from 'lucide-react';
import { Sigmar } from 'next/font/google';
import Link from 'next/link';

const sigmar = Sigmar({
  weight: '400',
  subsets: ['latin'],
});

export default function SiteIcon() {
  return (
    <Link
      href='/'
      className={`${sigmar.className} flex gap-1 text-xl items-center`}
    >
      <ShoppingBagIcon />
      Shoppy
    </Link>
  );
}
