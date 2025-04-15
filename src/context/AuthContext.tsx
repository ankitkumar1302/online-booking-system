"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import UserService, { UserData } from "@/utils/UserService";

type User = UserData | null;

type UserBooking = {
  id: string;
  userId: string;
  trainId?: string;
  busId?: string;
  seatNumber: string;
  status: string;
}

interface AuthContextType {
  user: User;
  userBookings: UserBooking[];
  login: (userData: User) => void;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [userBookings, setUserBookings] = useState<UserBooking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchUserProfile().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken || !user) return;

      const data = await UserService.getUserProfile();
      
      // Update user data with latest from server
      const updatedUser = {
        id: data.user.id,
        user_name: data.user.user_name,
        user_email: data.user.user_email,
        user_phone: data.user.user_phone,
        user_role: data.user.user_role
      };
      
      setUser(updatedUser);
      setUserBookings(data.bookings || []);
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Fetch user profile after login
    fetchUserProfile();
  };

  const logout = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        await UserService.logout();
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear user data regardless of API success
      setUser(null);
      setUserBookings([]);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, userBookings, login, logout, fetchUserProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 