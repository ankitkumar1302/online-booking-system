// Auth Types
export type UserRole = "admin" | "user";

export interface User {
  email: string;
  role: UserRole;
  name: string;
}

// Theme Types
export type Theme = "light" | "dark";

// Component Props Types
export interface AuthLayoutProps {
  children: React.ReactNode;
  theme: Theme;
  currentImageIndex: number;
  onPreviousImage: () => void;
  onNextImage: () => void;
  onThemeToggle: () => void;
}

export interface FormInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  theme: Theme;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Venue Types
export interface Venue {
  id: number;
  title: string;
  location: string;
  image: string;
  price: string;
  capacity: string;
  rating: number;
  description?: string;
  amenities?: string[];
  availability?: {
    start: string;
    end: string;
  }[];
}

// Booking Types
export interface Booking {
  id: number;
  userId: number;
  venueId: number;
  status: "pending" | "confirmed" | "cancelled";
  startTime: string;
  endTime: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
} 