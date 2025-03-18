# BookItNow - Component Guidelines

## Component Organization

BookItNow follows a modular component architecture based on atomic design principles. This document outlines the standards and best practices for component development.

## Component Directory Structure

Components are organized in the following structure:

```
src/
└── components/
    ├── auth/              # Authentication components
    │   ├── AuthLayout.tsx
    │   ├── FormInput.tsx
    │   └── index.ts
    ├── dashboard/         # Dashboard components
    │   ├── AdminDashboardLayout.tsx
    │   ├── UserDashboardLayout.tsx
    │   ├── ErrorBoundary.tsx
    │   ├── NotificationsPopover.tsx
    │   ├── ThemeToggle.tsx
    │   ├── Skeletons.tsx
    │   └── index.ts
    ├── ui/                # Reusable UI components
    │   ├── Skeleton.tsx
    │   ├── Tooltip.tsx
    │   └── index.ts
    ├── Navbar.tsx         # Global navigation
    ├── RootLayoutClient.tsx # Root layout wrapper
    └── index.ts
```

## Component Structure

Each component should follow this structure:

```tsx
/**
 * ComponentName
 * [Brief description of component purpose]
 */

// 1. Imports - ordered by:
// - React/Next.js imports
// - Third-party libraries
// - Custom components
// - Hooks
// - Utils
// - Types
// - Assets/styles
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SomeComponent } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/date';
import type { ComponentProps } from '@/types';

// 2. Types/Interfaces - clearly define prop types
interface ComponentNameProps {
  title: string;
  description?: string;
  onAction: () => void;
  isActive: boolean;
}

// 3. Component function - clear and concise
export function ComponentName({
  title,
  description = 'Default description',
  onAction,
  isActive,
}: ComponentNameProps) {
  // State declarations
  const [isOpen, setIsOpen] = useState(false);
  
  // Hooks
  const { user } = useAuth();
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // Event handlers
  const handleClick = () => {
    setIsOpen(!isOpen);
    onAction();
  };
  
  // Conditional rendering
  if (!user) return null;
  
  // JSX
  return (
    <motion.div 
      className="p-4 rounded-lg bg-white dark:bg-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p className="text-gray-600 dark:text-gray-300">{description}</p>}
      <button 
        onClick={handleClick}
        className={`px-4 py-2 mt-2 rounded ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
    </motion.div>
  );
}

// 4. Default exports are used for pages
// Named exports are used for components
```

## Component Types

### 1. Layout Components

Layout components handle the overall structure of pages and sections.

Example: `AuthLayout.tsx`

```tsx
/**
 * AuthLayout
 * Layout wrapper for authentication pages with consistent styling and structure
 */

import { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex bg-blue-600 items-center justify-center relative">
        <Image 
          src="/images/auth-background.jpg"
          alt="BookItNow authentication"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/50 flex flex-col items-center justify-center text-white p-8">
          <h1 className="text-4xl font-bold">BookItNow</h1>
          <p className="text-xl mt-4">Your one-stop booking platform</p>
        </div>
      </div>
      
      <motion.div 
        className="flex flex-col items-center justify-center p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {subtitle && <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>}
          <div className="mt-8">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
```

### 2. UI Components

UI components are atomic, reusable building blocks.

Example: `Skeleton.tsx`

```tsx
/**
 * Skeleton
 * Loading placeholder component with customizable dimensions
 */

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string;
}

export function Skeleton({ 
  className, 
  height = '1rem',
  width = '100%',
  borderRadius = '0.25rem'
}: SkeletonProps) {
  return (
    <div 
      className={cn(
        "animate-pulse bg-gray-200 dark:bg-gray-700",
        className
      )}
      style={{ 
        height, 
        width,
        borderRadius 
      }}
    />
  );
}
```

### 3. Feature Components

Feature components combine UI components to create specialized functionality.

Example: `NotificationsPopover.tsx`

```tsx
/**
 * NotificationsPopover
 * Dropdown menu for user notifications with real-time updates
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/Skeleton';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    // Simulate API call to fetch notifications
    setTimeout(() => {
      setNotifications([
        {
          id: '1',
          title: 'Booking Confirmed',
          message: 'Your flight to New York has been confirmed.',
          type: 'success',
          isRead: false,
          createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        },
        {
          id: '2',
          title: 'Price Drop Alert',
          message: 'Prices for your saved route have dropped by 15%.',
          type: 'info',
          isRead: true,
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(n => 
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(n => ({ ...n, isRead: true }))
    );
  };

  return (
    <div className="relative">
      <button
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  className="text-sm text-blue-500 hover:text-blue-700"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-4 space-y-4">
                  <Skeleton height="4rem" />
                  <Skeleton height="4rem" />
                  <Skeleton height="4rem" />
                </div>
              ) : notifications.length > 0 ? (
                notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 ${!notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900 dark:text-white">{notification.title}</h4>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No notifications yet
                </div>
              )}
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
              <button className="text-sm text-blue-500 hover:text-blue-700">
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

## Styling Guidelines

### Tailwind CSS Class Organization

Group related Tailwind classes in a logical order:

1. Layout (position, display, flex, grid)
2. Spacing (margin, padding)
3. Sizing (width, height)
4. Typography (text, font)
5. Backgrounds and borders
6. Effects (shadows, opacity)
7. Interactive states (hover, focus)
8. Responsive modifiers

Example:
```tsx
<div className="
  relative flex items-center justify-between
  px-4 py-2 my-2
  w-full h-12
  text-sm font-medium text-gray-700 dark:text-gray-200
  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg
  shadow-sm
  hover:bg-gray-50 dark:hover:bg-gray-750 focus:outline-none focus:ring-2 focus:ring-blue-500
  md:text-base
">
  {/* Content */}
</div>
```

### Class Merging Utility

Use the `cn` utility to conditionally merge Tailwind classes:

```tsx
import { cn } from '@/lib/utils';

// Example usage
function Button({ 
  className, 
  variant = 'primary',
  children 
}: ButtonProps) {
  return (
    <button 
      className={cn(
        "px-4 py-2 rounded-lg font-medium",
        variant === 'primary' && "bg-blue-500 text-white hover:bg-blue-600",
        variant === 'secondary' && "bg-gray-200 text-gray-800 hover:bg-gray-300",
        variant === 'danger' && "bg-red-500 text-white hover:bg-red-600",
        className
      )}
    >
      {children}
    </button>
  );
}
```

## Component Best Practices

### Performance Optimization

1. **Memoization**: Use React.memo for expensive components
   ```tsx
   export const ExpensiveComponent = React.memo(function ExpensiveComponent(props) {
     // Component implementation
   });
   ```

2. **Callback Optimization**: Use useCallback for functions passed as props
   ```tsx
   const handleSubmit = useCallback(() => {
     // Handle submission
   }, [/* dependencies */]);
   ```

3. **Derived State**: Use useMemo for expensive calculations
   ```tsx
   const filteredItems = useMemo(() => {
     return items.filter(item => item.status === 'active');
   }, [items]);
   ```

### Accessibility

1. **Semantic HTML**: Use appropriate HTML elements
   ```tsx
   // Good
   <button onClick={handleClick}>Click me</button>
   
   // Avoid
   <div onClick={handleClick} role="button" tabIndex={0}>Click me</div>
   ```

2. **ARIA attributes**: Include when needed
   ```tsx
   <button 
     aria-expanded={isOpen} 
     aria-controls="dropdown-menu"
   >
     Toggle Menu
   </button>
   <div 
     id="dropdown-menu" 
     aria-hidden={!isOpen}
   >
     {/* Menu content */}
   </div>
   ```

3. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
   ```tsx
   <div 
     role="button"
     tabIndex={0}
     onClick={handleClick}
     onKeyDown={(e) => {
       if (e.key === 'Enter' || e.key === ' ') {
         handleClick();
       }
     }}
   >
     Custom Button
   </div>
   ```

### Animation Guidelines

1. **Framer Motion Animations**: Use consistent animations
   ```tsx
   // Page transitions
   const pageVariants = {
     initial: { opacity: 0, y: 20 },
     animate: { opacity: 1, y: 0 },
     exit: { opacity: 0, y: -20 }
   };
   
   return (
     <motion.div
       initial="initial"
       animate="animate"
       exit="exit"
       variants={pageVariants}
       transition={{ duration: 0.3 }}
     >
       {/* Page content */}
     </motion.div>
   );
   ```

2. **Consistent Timing**: Use standard durations
   - Fast: 0.15s - 0.2s (micro-interactions)
   - Medium: 0.3s - 0.4s (component transitions)
   - Slow: 0.5s - 0.7s (page transitions)

### Error Handling

1. **Fall Back UI**: Provide graceful fallbacks
   ```tsx
   function UserProfile({ userId }) {
     const { data, error, isLoading } = useUser(userId);
     
     if (isLoading) return <ProfileSkeleton />;
     if (error) return <ErrorMessage message="Couldn't load profile" />;
     
     return <Profile data={data} />;
   }
   ```

2. **ErrorBoundary**: Wrap critical components
   ```tsx
   <ErrorBoundary fallback={<ErrorScreen />}>
     <CriticalComponent />
   </ErrorBoundary>
   ```

## Documentation

Each component should include:

1. Brief description comment at the top
2. Props documentation via TypeScript interfaces
3. JSDoc comments for complex logic
4. Usage examples for shared components

Example:
```tsx
/**
 * DataTable
 * 
 * A reusable table component with sorting, pagination, and selection.
 * 
 * @example
 * <DataTable
 *   data={users}
 *   columns={[
 *     { key: 'name', label: 'Name', sortable: true },
 *     { key: 'email', label: 'Email' },
 *     { key: 'role', label: 'Role' }
 *   ]}
 *   onRowClick={handleRowClick}
 * />
 */
```

## Testing Strategy

Components should be tested using:

1. **Unit Tests**: Test component rendering and behavior
2. **Integration Tests**: Test component interactions
3. **Snapshot Tests**: Compare against known good UI states

Test file structure:
```
ComponentName.tsx
ComponentName.test.tsx
```

Example test file:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('renders different variants correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-500');
    
    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-200');
  });
});
``` 