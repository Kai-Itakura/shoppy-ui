import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import SiteIcon from './site-icon';

type MobileNavProps = {
  pages: {
    title: string;
    path: string;
  }[];
};

export default function MobileNav({ pages }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger className='flex flex-col gap-1.5 md:hidden'>
        <div className='w-8 h-0.5 bg-slate-50'></div>
        <div className='w-8 h-0.5 bg-slate-50'></div>
        <div className='w-8 h-0.5 bg-slate-50'></div>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='w-48'
      >
        <SheetHeader>
          <SheetTitle>
            <SiteIcon />
          </SheetTitle>
        </SheetHeader>
        <div className='h-[2px] my-3 bg-slate-600'></div>
        <div>
          {pages.map((page) => (
            <SheetClose
              key={page.title}
              asChild
            >
              <Link
                href={page.path}
                className='rounded-md p-1 hover:bg-stone-500 block'
              >
                {page.title}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
