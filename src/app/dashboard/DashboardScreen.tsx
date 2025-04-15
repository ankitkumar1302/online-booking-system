"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserDashboardLayout from "@/components/dashboard/UserDashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import UserService from "@/utils/UserService";
import Link from "next/link";

/**
 * DashboardScreen - Main dashboard for users after login/signup
 * 
 * This screen shows bookings, recommendations, and user preferences.
 */
export default function DashboardScreen() {
  const { user, userBookings, fetchUserProfile } = useAuth();
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(false);
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    // Check if user is a new user who just completed onboarding
    const newUserFlag = localStorage.getItem('isNewUser');
    if (newUserFlag === 'true') {
      setIsNewUser(true);
      
      // Show welcome toast
      toast.success(`Welcome to BookItNow, ${user?.user_name}!`, {
        duration: 5000,
        description: "Your account has been created successfully."
      });
      
      // Clear the new user flag
      localStorage.removeItem('isNewUser');
    }
    
    // Get user preferences from localStorage
    const preferences = localStorage.getItem('userPreferences');
    if (preferences) {
      setUserPreferences(JSON.parse(preferences));
    }
    
    // Fetch user profile data
    fetchUserProfile()
      .then(() => {
        // Fetch stats data
        if (user?.user_role === 'admin') {
          fetchStats();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user]);

  const fetchStats = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) return;

      const data = await UserService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load dashboard statistics');
    }
  };

  // Format user preferences for display
  const formatPreferences = () => {
    if (!userPreferences) return null;
    
    // Create an array of all selected options for display
    const allSelections = [
      ...(userPreferences.purpose || []).map((item: string) => ({
        type: 'Purpose',
        value: item === 'flights' ? 'Flight Booking' : item === 'buses' ? 'Bus Booking' : 'Movie Booking'
      })),
      ...(userPreferences.travel || []).map((item: string) => ({
        type: 'Travel',
        value: item.charAt(0).toUpperCase() + item.slice(1)
      })),
      ...(userPreferences.entertainment || []).map((item: string) => ({
        type: 'Entertainment',
        value: item.charAt(0).toUpperCase() + item.slice(1)
      }))
    ];
    
    return allSelections;
  };

  const preferences = formatPreferences();

  return (
    <UserDashboardLayout>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome section */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {isNewUser ? "Welcome to your Dashboard!" : "Welcome back, " + (user?.user_name || "User") + "!"}
                </h1>
                <p className="text-white/80 text-lg">
                  {isNewUser 
                    ? "Your account has been created and we've set up your preferences. Start exploring!"
                    : "Ready to book your next adventure?"}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link 
                  href="/bookings" 
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-indigo-600 bg-white rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  View & Book Tickets
                </Link>
              </div>
            </div>
          </div>

          {/* Admin stats section */}
          {user?.user_role === 'admin' && stats && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Admin Dashboard
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="text-sm text-blue-600 dark:text-blue-300">Total Users</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_users}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="text-sm text-green-600 dark:text-green-300">Regular Users</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.users}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h3 className="text-sm text-purple-600 dark:text-purple-300">Admin Users</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.admin}</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h3 className="text-sm text-amber-600 dark:text-amber-300">Total Bookings</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total_bookings}</p>
                </div>
              </div>
            </div>
          )}

          {/* User bookings section */}
          {userBookings && userBookings.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Your Bookings
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Seat</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {userBookings.map((booking, index) => (
                      <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {booking.trainId ? 'Train' : 'Bus'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {booking.seatNumber}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* User preferences section */}
          {preferences && preferences.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Your Preferences
              </h2>
              <div className="flex flex-wrap gap-2">
                {preferences.map((pref: any, index: number) => (
                  <div 
                    key={index}
                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                  >
                    {pref.type}: {pref.value}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended bookings based on preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-200 dark:bg-gray-700 h-40 flex items-center justify-center">
                <span className="text-4xl">✈️</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Book a Flight</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Find the best deals on domestic and international flights
                </p>
                <button className="mt-4 w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm">
                  Search Flights
                </button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-200 dark:bg-gray-700 h-40 flex items-center justify-center">
                <span className="text-4xl">🎬</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Book a Movie</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Get tickets for the latest blockbusters
                </p>
                <button className="mt-4 w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm">
                  Browse Movies
                </button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-gray-200 dark:bg-gray-700 h-40 flex items-center justify-center">
                <span className="text-4xl">🚌</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Book a Bus</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Find comfortable buses for your next journey
                </p>
                <button className="mt-4 w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm">
                  Find Bus Tickets
                </button>
              </div>
            </div>
          </div>
          
          {/* First-time user guide */}
          {isNewUser && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">
                Getting Started Guide
              </h2>
              <p className="text-blue-700 dark:text-blue-400 mb-4">
                Welcome to BookItNow! Here's how to make the most of your account:
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="bg-blue-200 dark:bg-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-blue-800 dark:text-blue-200 flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Browse through our booking options for flights, movies, and buses
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-200 dark:bg-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-blue-800 dark:text-blue-200 flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Update your profile and preferences in settings
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-200 dark:bg-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-blue-800 dark:text-blue-200 flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Check your booking history and manage upcoming bookings
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </UserDashboardLayout>
  );
} 