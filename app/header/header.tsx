'use client';

import MobileNav from '@/app/header/components/mobile-nav';
import Settings from '@/app/header/components/settings';
import ToggleTheme from '@/app/header/components/toggle-theme';
import { useAuthContext } from '../(auth)/context/auth-context';
import DesktopNav from './components/desktop-nav';
import { protectedRoutes, publicRoutes } from './constants/routes';

export default function Header() {
  const isAuthenticated = useAuthContext();

  const pages = isAuthenticated ? protectedRoutes : publicRoutes;

  return (
    <header className='top-0 w-svw bg-slate-600  py-2 px-4 flex justify-between gap-2 items-center shadow-md'>
      <DesktopNav pages={pages} />
      <MobileNav pages={pages} />
      <div className='flex justify-end gap-2 items-center'>
        {isAuthenticated && <Settings />}
        <ToggleTheme />
      </div>
    </header>
  );
}
