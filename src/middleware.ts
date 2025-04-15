import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = ['/login', '/signup', '/forgot-password', '/', '/onboarding'].includes(path);
  const user = request.cookies.get('user')?.value;
  const hasCompletedOnboarding = request.cookies.get('onboarding_completed')?.value === 'true';

  // Allow public paths without authentication
  if (isPublicPath) {
    // Redirect logged-in users away from auth pages
    if (user && (path === '/login' || path === '/signup')) {
      const userData = JSON.parse(user);
      return NextResponse.redirect(
        new URL(userData.role === 'admin' ? '/admin/dashboard' : '/dashboard', request.url)
      );
    }
    return NextResponse.next();
  }

  // Handle protected routes
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Enforce onboarding completion
  if (!hasCompletedOnboarding && path !== '/user-onboarding') {
    return NextResponse.redirect(new URL('/user-onboarding', request.url));
  }

  // Redirect away from onboarding if already completed
  if (hasCompletedOnboarding && path === '/user-onboarding') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Check admin permissions
  if (path.startsWith('/admin')) {
    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/onboarding',
    '/user-onboarding',
    '/dashboard/:path*',
    '/admin/:path*',
    '/forgot-password'
  ],
} 