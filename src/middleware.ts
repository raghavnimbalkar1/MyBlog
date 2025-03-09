// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect any route that starts with /admin except /admin/login
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};