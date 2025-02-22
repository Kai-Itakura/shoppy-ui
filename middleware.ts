import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from './app/(auth)/constants/auth-cookie';
import { publicRoutes } from './app/header/constants/routes';

export function middleware(req: NextRequest) {
  const auth = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!auth && !publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route.path))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png).*)'],
};
