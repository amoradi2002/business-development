import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE !== 'false';

  // When not in demo mode, redirect backend routes to home
  if (!isDemo) {
    if (
      pathname.startsWith('/admin') ||
      pathname.startsWith('/investor-portal') ||
      pathname.startsWith('/broker-portal')
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/investor-portal/:path*', '/broker-portal/:path*'],
};
