"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1C1D21]" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } ${theme === "dark" ? "bg-[#1C1D21] border-r border-white/10" : "bg-white border-r border-gray-200"}`}>
        <div className="h-full px-3 py-4 overflow-y-auto w-64">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center mb-8 px-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-semibold">B</span>
            </div>
            <span className={`ml-2 text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              BookItNow Admin
            </span>
          </Link>

          {/* Navigation */}
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin/dashboard"
                className={`flex items-center p-3 rounded-lg hover:bg-indigo-500/10 group ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                <svg className="w-5 h-5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/venues"
                className={`flex items-center p-3 rounded-lg hover:bg-indigo-500/10 group ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                <svg className="w-5 h-5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="ml-3">Venues</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/bookings"
                className={`flex items-center p-3 rounded-lg hover:bg-indigo-500/10 group ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                <svg className="w-5 h-5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="ml-3">Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className={`flex items-center p-3 rounded-lg hover:bg-indigo-500/10 group ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                <svg className="w-5 h-5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="ml-3">Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className={`flex items-center p-3 rounded-lg hover:bg-indigo-500/10 group ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                <svg className="w-5 h-5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="ml-3">Settings</span>
              </Link>
            </li>
          </ul>

          {/* User Profile */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className={`p-3 rounded-lg ${
              theme === "dark" ? "bg-white/5" : "bg-gray-50"
            }`}>
              <div className="flex items-center gap-3">
                <Image
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366F1&color=fff`}
                  alt={user?.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                  unoptimized
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {user?.name}
                  </p>
                  <p className={`text-xs truncate ${
                    theme === "dark" ? "text-white/50" : "text-gray-500"
                  }`}>
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className={`p-1.5 rounded-lg ${
                    theme === "dark" 
                      ? "hover:bg-white/10" 
                      : "hover:bg-gray-100"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`p-4 sm:ml-64 ${theme === "dark" ? "bg-[#1C1D21]" : "bg-gray-50"}`}>
        <div className="p-4 mt-14">
          {children}
        </div>
      </div>

      {/* Top Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-30 ${
        theme === "dark" ? "bg-[#1C1D21] border-b border-white/10" : "bg-white border-b border-gray-200"
      }`}>
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-2 rounded-lg ${
                  theme === "dark" 
                    ? "hover:bg-white/10" 
                    : "hover:bg-gray-100"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-lg ${
                  theme === "dark" 
                    ? "hover:bg-white/10" 
                    : "hover:bg-gray-100"
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
} 