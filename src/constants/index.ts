// Auth Constants
export const AUTH_TOKEN_KEY = 'token';
export const USER_DATA_KEY = 'user';

// Theme Constants
export const THEME_KEY = 'theme';

// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/signup',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  VENUES: {
    LIST: '/api/venues',
    DETAILS: (id: string) => `/api/venues/${id}`,
    CREATE: '/api/venues',
    UPDATE: (id: string) => `/api/venues/${id}`,
    DELETE: (id: string) => `/api/venues/${id}`,
  },
  BOOKINGS: {
    LIST: '/api/bookings',
    DETAILS: (id: string) => `/api/bookings/${id}`,
    CREATE: '/api/bookings',
    UPDATE: (id: string) => `/api/bookings/${id}`,
    CANCEL: (id: string) => `/api/bookings/${id}/cancel`,
  },
  USERS: {
    LIST: '/api/users',
    DETAILS: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
  },
};

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
    FORGOT_PASSWORD: '/forgot-password',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    VENUES: '/admin/venues',
    BOOKINGS: '/admin/bookings',
    USERS: '/admin/users',
    SETTINGS: '/admin/settings',
  },
  USER: {
    DASHBOARD: '/dashboard',
    BOOKINGS: '/dashboard/bookings',
    FAVORITES: '/dashboard/favorites',
    SETTINGS: '/dashboard/settings',
  },
};

// Venue Types
export const VENUE_TYPES = [
  'Conference Room',
  'Meeting Room',
  'Event Space',
  'Workshop Space',
  'Training Room',
  'Board Room',
  'Auditorium',
];

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_EXISTS: 'Email already exists',
    WEAK_PASSWORD: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
    INVALID_EMAIL: 'Please enter a valid email address',
  },
  BOOKING: {
    VENUE_UNAVAILABLE: 'This venue is not available for the selected time slot',
    INVALID_TIME: 'Please select a valid time slot',
    BOOKING_NOT_FOUND: 'Booking not found',
  },
  GENERAL: {
    SOMETHING_WENT_WRONG: 'Something went wrong. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    NOT_FOUND: 'Resource not found',
  },
}; 