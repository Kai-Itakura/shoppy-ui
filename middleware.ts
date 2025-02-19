import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/signin', '/login'];

export function middleware(req: NextRequest) {
  const auth = req.cookies.get('Authentication')?.value;

  if (!auth && !publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png).*)'],
};
