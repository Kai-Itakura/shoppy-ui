import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from './app/(auth)/constants/auth-cookie';
import { publicRoutes } from './app/header/constants/routes';

export function middleware(req: NextRequest) {
  const auth = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!auth && !publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route.path))) {
    if (req.headers.get('accept') === 'text/x-component') {
      console.log('🔥: Unauthenticated post request', req);
      return new NextResponse(null, {
        status: 303,
        headers: {
          'X-Action-Redirect': '/login',
        },
      });
    }

    return NextResponse.redirect(new URL('/login', req.url), {
      status: 303,
    });
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png).*)'],
};
