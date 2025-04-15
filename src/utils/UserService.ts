/**
 * UserService - API service for user-related endpoints
 */

const BASE_URL = 'https://ticket-backend-31v6.onrender.com/api';

export interface UserData {
  id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_role: 'user' | 'admin';
}

export interface LoginRequest {
  user_email: string;
  user_password: string;
}

export interface SignupRequest {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_password: string;
  user_role: 'user' | 'admin';
}

export interface UserProfileResponse {
  message: string;
  user: UserData;
  bookings: Array<{
    id: string;
    userId: string;
    trainId?: string;
    busId?: string;
    seatNumber: string;
    status: string;
  }>;
}

export interface AllUsersResponse {
  message: string;
  users: UserData[];
}

export interface StatsResponse {
  total_users: number;
  users: number;
  admin: number;
  total_bookings: number;
}

// Helper for API calls
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const authToken = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Network response was not ok');
  }

  return response.json();
};

export const UserService = {
  // Authentication
  signup: async (userData: SignupRequest): Promise<{ message: string }> => {
    return apiCall('/signup', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: LoginRequest): Promise<any> => {
    return apiCall('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: async (): Promise<{ message: string }> => {
    return apiCall('/logout', { method: 'POST' });
  },

  // User profile
  getUserProfile: async (): Promise<UserProfileResponse> => {
    return apiCall('/myprofile', { method: 'GET' });
  },

  getAllUsers: async (): Promise<AllUsersResponse> => {
    return apiCall('/allusers', { method: 'GET' });
  },

  // User management (admin functions)
  deleteUser: async (userId: string): Promise<{ message: string; user: UserData }> => {
    return apiCall(`/deleteuser/${userId}`, { method: 'POST' });
  },

  updateUser: async (userId: string, userData: Partial<UserData>): Promise<{ message: string; user: UserData }> => {
    return apiCall(`/updateuser/${userId}`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Stats
  getStats: async (): Promise<StatsResponse> => {
    return apiCall('/stats', { method: 'GET' });
  },
};

export default UserService; 