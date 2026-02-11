import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if the request is for the /admin route (but not /api/auth)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_token');

    // If no token is found, redirect to home page or login page
    if (!adminToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-is-admin', 'true');
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

// Configure compatible paths
export const config = {
  matcher: '/admin/:path*',
};
