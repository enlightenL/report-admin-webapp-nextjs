import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  console.log('pathname:', request.nextUrl.pathname);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};
