
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const adminSession = request.cookies.get('admin_session');
    const userSession = request.cookies.get('user_session'); // User authentication cookie
    const path = request.nextUrl.pathname;

    // Define admin-only protected routes
    const isAdminRoute =
        path.startsWith('/admin/dashboard') ||
        path.startsWith('/admin/add-professional');

    // Define user protected routes (payment page)
    const isUserRoute = path.startsWith('/esewa-payment');

    // Check admin routes
    if (isAdminRoute) {
        if (!adminSession) {
            // Redirect to admin login if no admin session
            const url = new URL('/admin', request.url);
            url.searchParams.set('redirect', path);
            return NextResponse.redirect(url);
        }
    }

    // Check user routes (payment page)
    if (isUserRoute) {
        if (!userSession) {
            // Redirect to website login if no user session
            const url = new URL('/login', request.url);
            url.searchParams.set('redirect', path);
            return NextResponse.redirect(url);
        }
    }

    // Allow access to admin login page if already authenticated
    if (path === '/admin' && adminSession) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/esewa-payment'],
};
