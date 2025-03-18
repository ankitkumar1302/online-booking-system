# BookItNow - Technical Documentation

## Overview

BookItNow is a modern, full-stack online booking platform built with Next.js 14, React, TypeScript, and TailwindCSS. The system allows users to book flights, movies, and bus tickets in one unified platform.

## Architecture

### Frontend Architecture

The application follows a modern Next.js 14 architecture using the App Router pattern:

```
src/
├── app/                    # Next.js 14 app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── dashboard/         # User dashboard
│   ├── admin/            # Admin dashboard
│   ├── user-onboarding/  # Post-signup flow
│   └── onboarding/       # Marketing/landing
├── components/           # Reusable components
│   ├── auth/            # Auth components
│   ├── dashboard/       # Dashboard components
│   └── ui/             # UI components
├── context/             # React Context
├── hooks/              # Custom hooks
├── lib/               # Utility functions
├── types/             # TypeScript types
└── utils/             # Helper functions
```

### State Management

BookItNow uses React Context API for global state management:

1. **AuthContext**: Manages authentication state, user data, and onboarding status
2. **ThemeContext**: Manages theme (dark/light mode) preferences

### Authentication Flow

The authentication system uses a combination of client-side and server-side validation:

1. **Client-side storage**: User data stored in localStorage and cookies
2. **Server-side protection**: Next.js middleware for route protection
3. **Role-based access**: Different routes and capabilities for admin vs regular users

Authentication flow:
- User registers → Onboarding process → Dashboard
- Login credentials validated → JWT token stored → Redirected based on role

### Middleware Protection

The application uses Next.js middleware to protect routes and manage authentication:

```typescript
export function middleware(request: NextRequest) {
  // Extract path and auth status
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup' || path === '/forgot-password' || 
                      path === '/' || path === '/onboarding';
  const userCookie = request.cookies.get('user')?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;
  
  // Route protection logic
  if (!user && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Role-based access control
  if (path.startsWith('/admin')) {
    if (!user || user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  // Allow request to proceed
  return NextResponse.next();
}
```

## Component Structure

### UI Component Hierarchy

The application uses a composable component architecture:

1. **Layout Components**:
   - `RootLayoutClient`: Global layout wrapper with theme provider
   - `AuthLayout`: Layout for authentication pages
   - `UserDashboardLayout`: Layout for user dashboard
   - `AdminDashboardLayout`: Layout for admin dashboard

2. **UI Components**:
   - `Skeleton`: Base loading skeleton component
   - `Tooltip`: Enhanced tooltip component with positioning
   - `ThemeToggle`: Theme switcher with animations
   - `NotificationsPopover`: Notification system
   - `ErrorBoundary`: Error handling component

3. **Authentication Components**:
   - `FormInput`: Reusable form input with validation
   - `AuthLayout`: Shared layout for auth screens

### Dashboard Components

The dashboard interfaces use specialized components:

1. **User Dashboard**:
   - Booking history
   - Upcoming bookings
   - Quick actions
   - Personalized recommendations

2. **Admin Dashboard**:
   - User management
   - Booking analytics
   - System settings

## Styling System

BookItNow uses TailwindCSS with customization:

```typescript
// tailwind.config.ts
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { /* Custom colors */ },
        secondary: { /* Custom colors */ },
      },
      // Other custom theme extensions
    },
  },
  plugins: [],
}
```

## Performance Optimizations

The application implements several performance optimizations:

1. **Code Splitting**: Routes and components are split for faster initial load times
2. **Lazy Loading**: Components outside the viewport are lazy loaded
3. **Image Optimization**: Next.js Image component for optimized images
4. **Response Caching**: API responses are cached where appropriate
5. **Skeleton Loading**: Skeleton components for improved perceived performance

## Animation System

BookItNow uses Framer Motion for animations:

1. **Page Transitions**: Smooth transitions between pages
2. **Component Animations**: Micro-interactions for improved UX
3. **Theme Transitions**: Smooth transitions between light and dark themes

## Development Workflow

### Setup Requirements

- Node.js 18+
- npm/yarn
- Git

### Installation Steps

```bash
# Clone repository
git clone https://github.com/yourusername/online-booking-system.git

# Install dependencies
cd online-booking-system
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

### Environment Variables

```
# Authentication
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL=your-database-url

# External APIs
STRIPE_SECRET_KEY=your-stripe-secret
```

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Testing

The application should include:

1. **Unit Tests**: Testing individual components and functions
2. **Integration Tests**: Testing component interactions
3. **End-to-End Tests**: Testing complete user flows

## Design Patterns

BookItNow implements several React design patterns:

1. **Provider Pattern**: Context providers for global state
2. **Compound Components**: Related components grouped together
3. **Render Props**: Flexible component rendering
4. **Custom Hooks**: Reusable logic with custom hooks

## Code Standards

1. **TypeScript**: Strict typing for better developer experience
2. **ESLint**: Code quality enforcement
3. **Prettier**: Consistent code formatting
4. **Component Structure**: Consistent component organization

## Error Handling

1. **ErrorBoundary Component**: Catches and handles React errors
2. **API Error Handling**: Consistent error responses
3. **Form Validation**: Client-side validation before submission

## Security Considerations

1. **XSS Protection**: React's built-in XSS protection
2. **CSRF Protection**: Token validation for forms
3. **Authentication**: Secure JWT handling
4. **Route Protection**: Middleware for protected routes

## Deployment

The application can be deployed to various platforms:

1. **Vercel**: Recommended for Next.js applications
2. **AWS**: For custom infrastructure
3. **Google Cloud**: For enterprise deployments
4. **Digital Ocean**: For simpler deployments

## Monitoring and Analytics

The application should implement:

1. **Error Tracking**: Real-time error monitoring
2. **Performance Metrics**: Core Web Vitals tracking
3. **User Analytics**: User behavior analysis
4. **Server Monitoring**: Backend performance tracking 