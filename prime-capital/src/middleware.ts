import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Portals are blocked by default. To access them locally for development,
  // set NEXT_PUBLIC_DEMO_MODE=true in .env.local
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (!isDemoMode) {
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
