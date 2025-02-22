import Link from 'next/link';
import SiteIcon from './site-icon';

type DesktopNavProps = {
  pages: {
    title: string;
    path: string;
  }[];
};

export default function DesktopNav({ pages }: DesktopNavProps) {
  return (
    <div className='hidden gap-8  text-slate-50 md:flex'>
      <SiteIcon />
      <nav className='flex gap-4 items-center'>
        {pages.map((page) => (
          <Link
            key={page.title}
            href={page.path}
            className='rounded-md p-1 hover:bg-stone-500'
          >
            {page.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
