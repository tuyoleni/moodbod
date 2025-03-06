import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;
        const userAgent = req.headers.get('user-agent') || '';
        
        // Check if device is mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);

        // If mobile trying to access dashboard or admin
        if (isMobile && (path.startsWith('/dashboard') || path.startsWith('/admin'))) {
            return NextResponse.redirect(new URL('/mobile-notice', req.url));
        }

        // Regular auth checks
        if (path.startsWith('/admin') && token?.role !== 'admin') {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        if (path === '/dashboard' && token?.role === 'admin') {
            return NextResponse.redirect(new URL('/admin', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    }
);

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*', '/mobile-notice']
};