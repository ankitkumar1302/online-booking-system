"use client";

import AdminDashboardLayout from "@/components/dashboard/AdminDashboardLayout";
import { useTheme } from "@/context/ThemeContext";

export default function AdminDashboardPage() {
  const { theme } = useTheme();

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className={`text-3xl font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Dashboard Overview
          </h1>
          <p className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
            Welcome to your admin dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Venues */}
          <div className={`p-6 rounded-xl ${
            theme === "dark" ? "bg-white/5" : "bg-white"
          }`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${
                theme === "dark" ? "bg-indigo-500/10" : "bg-indigo-50"
              }`}>
                <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-white/50" : "text-gray-500"
                }`}>
                  Total Venues
                </p>
                <p className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  128
                </p>
              </div>
            </div>
          </div>

          {/* Active Bookings */}
          <div className={`p-6 rounded-xl ${
            theme === "dark" ? "bg-white/5" : "bg-white"
          }`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${
                theme === "dark" ? "bg-green-500/10" : "bg-green-50"
              }`}>
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-white/50" : "text-gray-500"
                }`}>
                  Active Bookings
                </p>
                <p className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  45
                </p>
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className={`p-6 rounded-xl ${
            theme === "dark" ? "bg-white/5" : "bg-white"
          }`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${
                theme === "dark" ? "bg-blue-500/10" : "bg-blue-50"
              }`}>
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-white/50" : "text-gray-500"
                }`}>
                  Total Users
                </p>
                <p className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  2,456
                </p>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className={`p-6 rounded-xl ${
            theme === "dark" ? "bg-white/5" : "bg-white"
          }`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${
                theme === "dark" ? "bg-yellow-500/10" : "bg-yellow-50"
              }`}>
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-white/50" : "text-gray-500"
                }`}>
                  Revenue
                </p>
                <p className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  $24,500
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`rounded-xl ${theme === "dark" ? "bg-white/5" : "bg-white"}`}>
          <div className="p-6 border-b border-gray-200 dark:border-white/10">
            <h2 className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Recent Activity
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  title: "New Booking",
                  description: "John Doe booked Conference Room A",
                  time: "5 minutes ago",
                  icon: (
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                {
                  title: "New User",
                  description: "Sarah Smith created an account",
                  time: "10 minutes ago",
                  icon: (
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  )
                },
                {
                  title: "Venue Update",
                  description: "Meeting Room B was updated",
                  time: "15 minutes ago",
                  icon: (
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  )
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    theme === "dark" ? "bg-white/5" : "bg-gray-50"
                  }`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {activity.title}
                    </p>
                    <p className={`text-sm ${
                      theme === "dark" ? "text-white/50" : "text-gray-500"
                    }`}>
                      {activity.description}
                    </p>
                  </div>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-white/50" : "text-gray-500"
                  }`}>
                    {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
} 