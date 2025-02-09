import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || 
                      path === '/signup' || 
                      path === '/forgot-password' ||
                      path === '/' ||
                      path === '/onboarding';  // Public onboarding page

  // Get the user data from cookies
  const user = request.cookies.get('user')?.value;
  const hasCompletedOnboarding = request.cookies.get('onboarding_completed')?.value === 'true';

  // If it's the public onboarding page or home page, allow access
  if (path === '/onboarding' || path === '/') {
    return NextResponse.next();
  }

  // If the user is not logged in and tries to access protected routes
  if (!user && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is logged in but hasn't completed onboarding and tries to access protected routes
  if (user && !hasCompletedOnboarding && path !== '/user-onboarding' && !isPublicPath) {
    return NextResponse.redirect(new URL('/user-onboarding', request.url));
  }

  // If the user is logged in and has completed onboarding, but tries to access onboarding pages
  if (user && hasCompletedOnboarding && path === '/user-onboarding') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the user is logged in and trying to access auth pages (login/signup)
  if (user && (path === '/login' || path === '/signup')) {
    const userData = JSON.parse(user);
    return NextResponse.redirect(
      new URL(userData.role === 'admin' ? '/admin/dashboard' : '/dashboard', request.url)
    );
  }

  // For admin routes, check if the user is an admin
  if (path.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

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