# BookItNow - Online Booking System

A modern, full-stack online booking platform built with Next.js 14, React, TypeScript, and TailwindCSS. The system allows users to book flights, movies, and bus tickets in one unified platform.

## 🚀 Features

- **Authentication & Authorization**
  - Email/Password authentication
  - OAuth integration (Google)
  - Role-based access control (Admin/User)
  - Protected routes with middleware
  - Persistent sessions

- **User Experience**
  - Dark/Light theme support
  - Responsive design
  - Modern UI with animations (Framer Motion)
  - Multi-step onboarding flow
  - Personalized dashboard

- **Booking Features**
  - Flight booking
  - Movie ticket booking
  - Bus ticket booking
  - Real-time availability
  - Secure payment processing
  - Booking history
  - Favorites system

## 🏗️ Technical Architecture

### Frontend Stack
- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS
- Framer Motion
- Shadcn UI Components
- Context API for state management

### Authentication Flow
1. User lands on `/` → redirected to `/onboarding` (marketing page)
2. User signs up → `/signup`
3. After signup → `/user-onboarding` (personalization)
4. After onboarding → `/dashboard`

### Directory Structure
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

### Key Components

#### Authentication Context
```typescript
// src/context/AuthContext.tsx
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
```

#### Theme Context
```typescript
// src/context/ThemeContext.tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

### API Routes

#### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/signup` - User registration
- POST `/api/auth/logout` - User logout
- POST `/api/auth/refresh` - Refresh token

#### Bookings
- GET `/api/bookings` - List user bookings
- GET `/api/bookings/:id` - Get booking details
- POST `/api/bookings` - Create booking
- PUT `/api/bookings/:id` - Update booking
- DELETE `/api/bookings/:id` - Cancel booking

#### User Management
- GET `/api/users` - List users (admin)
- GET `/api/users/:id` - Get user details
- PUT `/api/users/:id` - Update user
- DELETE `/api/users/:id` - Delete user

## 🔒 Authentication & Authorization

### Middleware Protection
```typescript
// src/middleware.ts
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';
  const user = request.cookies.get('user')?.value;
  
  // Redirect logic for protected routes
  if (!user && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### Protected Routes
- `/dashboard/*` - User dashboard routes
- `/admin/*` - Admin dashboard routes
- `/user-onboarding` - Post-signup onboarding

## 🎨 UI/UX Features

### Theme System
- System-wide dark/light mode
- Persistent theme preference
- Smooth transitions
- Tailwind CSS classes for theme consistency

### Animation System
- Page transitions
- Component animations
- Loading states
- Micro-interactions

### Responsive Design
- Mobile-first approach
- Breakpoint system:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## 📱 User Onboarding Flow

### Steps
1. **Welcome**
   - Introduction to platform
   - Key features overview

2. **Purpose Selection**
   - Flights ✈️
   - Buses 🚌
   - Movies 🎬

3. **Travel Preferences**
   - Domestic/International
   - Business/Leisure
   - Preferred airlines/bus operators

4. **Entertainment Preferences**
   - Movie genres
   - Theater chains
   - Viewing preferences

## 🎯 Dashboard Features

### User Dashboard
- Booking history
- Upcoming bookings
- Quick actions
- Personalized recommendations
- Profile management
- Notification center

### Admin Dashboard
- User management
- Booking overview
- Analytics
- System settings
- Content management

## 💳 Booking System

### Flight Booking
- Search flights
- Filter options
- Seat selection
- Passenger details
- Payment processing

### Movie Booking
- Browse movies
- Theater selection
- Seat mapping
- Snack ordering
- E-ticket generation

### Bus Booking
- Route search
- Seat layout
- Boarding points
- Instant confirmation
- Route tracking

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- npm/yarn
- Git

### Installation
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
```env
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

## 🚀 Deployment

### Build Process
```bash
# Build application
npm run build

# Start production server
npm start
```

### Deployment Platforms
- Vercel (recommended)
- AWS
- Google Cloud
- Digital Ocean

## 📈 Performance Optimization

### Implemented Optimizations
- Image optimization with Next.js Image
- Code splitting
- Route prefetching
- API response caching
- Lazy loading components

### Monitoring
- Real-time error tracking
- Performance metrics
- User analytics
- Server monitoring

## 🤝 Contributing

### Development Process
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

### Code Style
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Component best practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Team

- Frontend Developer - [Name]
- Backend Developer - [Name]
- UI/UX Designer - [Name]
- Project Manager - [Name]

## 📞 Support

For support, email support@bookitnow.com or join our Slack channel.
