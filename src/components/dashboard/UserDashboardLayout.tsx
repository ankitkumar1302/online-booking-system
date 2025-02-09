"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const DASHBOARD_MENU = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    label: "My Bookings",
    href: "/dashboard/bookings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    label: "Favorites",
    href: "/dashboard/favorites",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

interface UserDashboardLayoutProps {
  children: ReactNode;
}

export default function UserDashboardLayout({ children }: UserDashboardLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const pathname = usePathname();

  // Get current page name from pathname
  const getCurrentPageName = () => {
    const path = pathname.split("/").filter(Boolean);
    return path[path.length - 1]?.charAt(0).toUpperCase() + path[path.length - 1]?.slice(1) || "Dashboard";
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1C1D21]" : "bg-gray-50"}`}>
      {/* Dashboard Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 right-0 left-0 z-50 backdrop-blur-lg border-b ${
          theme === "dark" ? "border-white/10 bg-[#1C1D21]/80" : "border-gray-200/80 bg-white/80"
        }`}
      >
        <div className="h-16 px-4 lg:px-6">
          <div className="h-full flex items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <span className="text-white text-lg font-semibold">B</span>
              </div>
              <span className={`text-xl font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                BookItNow
              </span>
            </Link>

            {/* Navigation Menu - Desktop */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center gap-3">
                {DASHBOARD_MENU.map((item) => (
                  <motion.div key={item.label} whileHover={{ scale: 1.02 }}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        pathname === item.href
                          ? theme === "dark"
                            ? "bg-white/10 text-white"
                            : "bg-gray-100 text-gray-900"
                          : theme === "dark"
                            ? "text-white/80 hover:bg-white/10"
                            : "text-gray-700 hover:bg-gray-100"
                      } hover:shadow-lg hover:-translate-y-0.5`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl ${
                theme === "dark" ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>

            {/* Right Section */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2 lg:p-2.5 rounded-xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white/5 hover:bg-white/10 text-white"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                } hover:shadow-lg hover:-translate-y-0.5`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </motion.button>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`p-2 lg:p-2.5 rounded-xl transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10 text-white"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  } hover:shadow-lg hover:-translate-y-0.5`}
                  aria-label="View notifications"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {/* Notification Badge */}
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#1C1D21]"></span>
                </motion.button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute right-0 mt-2 w-[320px] lg:w-96 rounded-2xl shadow-xl ${
                        theme === "dark" ? "bg-[#1C1D21] border border-white/10" : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`text-sm font-semibold ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}>
                            Notifications
                          </h3>
                          <button className={`text-xs font-medium ${
                            theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                          }`}>
                            Mark all as read
                          </button>
                        </div>
                        <div className="space-y-3">
                          {/* Sample Notifications */}
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className={`p-3 rounded-xl ${
                              theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"
                            } transition-all duration-300 cursor-pointer group`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-xl ${
                                theme === "dark" ? "bg-indigo-500/10" : "bg-indigo-50"
                              }`}>
                                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm ${theme === "dark" ? "text-white/90" : "text-gray-800"}`}>
                                  Your booking has been confirmed
                                </p>
                                <span className={`text-xs ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
                                  2 minutes ago
                                </span>
                              </div>
                              <button className={`opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all ${
                                theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-200"
                              }`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className={`p-3 rounded-xl ${
                              theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-gray-100"
                            } transition-all duration-300 cursor-pointer group`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-xl ${
                                theme === "dark" ? "bg-green-500/10" : "bg-green-50"
                              }`}>
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm ${theme === "dark" ? "text-white/90" : "text-gray-800"}`}>
                                  New feature available
                                </p>
                                <span className={`text-xs ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
                                  1 hour ago
                                </span>
                              </div>
                              <button className={`opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all ${
                                theme === "dark" ? "hover:bg-white/10" : "hover:bg-gray-200"
                              }`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </motion.div>
                        </div>
                        
                        <button className={`w-full mt-4 py-2 text-sm font-medium rounded-xl transition-all ${
                          theme === "dark" 
                            ? "text-white/80 hover:bg-white/5" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}>
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={`flex items-center gap-2 p-1.5 pl-2 rounded-xl transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-gray-50 hover:bg-gray-100"
                  } hover:shadow-lg hover:-translate-y-0.5`}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={user?.image ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=6366F1&color=fff`}
                      alt={user?.name || "User"}
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    <span className={`hidden lg:block text-sm font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {user?.name || "User"}
                    </span>
                  </div>
                  <svg className={`w-4 h-4 ${
                    theme === "dark" ? "text-white/80" : "text-gray-700"
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-xl ${
                        theme === "dark" ? "bg-[#1C1D21] border border-white/10" : "bg-white border border-gray-200"
                      }`}
                    >
                      <div className="p-2">
                        <div className={`px-2 py-3 mb-2 rounded-xl ${
                          theme === "dark" ? "bg-white/5" : "bg-gray-50"
                        }`}>
                          <div className={`text-sm font-medium ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}>
                            {user?.name || "User"}
                          </div>
                          <div className={`text-xs truncate ${
                            theme === "dark" ? "text-white/50" : "text-gray-500"
                          }`}>
                            {user?.email || "user@example.com"}
                          </div>
                        </div>
                        
                        <motion.div whileHover={{ scale: 1.02 }}>
                          <Link
                            href="/dashboard/profile"
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                              theme === "dark"
                                ? "text-white/90 hover:bg-white/10"
                                : "text-gray-700 hover:bg-gray-100"
                            } transition-colors`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            View Profile
                          </Link>
                        </motion.div>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          onClick={logout}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
                            theme === "dark"
                              ? "text-white/90 hover:bg-white/10"
                              : "text-gray-700 hover:bg-gray-100"
                          } transition-colors`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t ${
                theme === "dark" ? "border-white/10 bg-[#1C1D21]" : "border-gray-200 bg-white"
              }`}
            >
              <div className="px-4 py-3 space-y-1">
                {DASHBOARD_MENU.map((item) => (
                  <motion.div key={item.label} whileHover={{ scale: 1.02 }}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        pathname === item.href
                          ? theme === "dark"
                            ? "bg-white/10 text-white"
                            : "bg-gray-100 text-gray-900"
                          : theme === "dark"
                            ? "text-white/80 hover:bg-white/10"
                            : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main className={`pt-16 min-h-screen transition-all duration-300 ${
        theme === "dark" ? "bg-[#1C1D21]" : "bg-gray-50"
      }`}>
        {children}
      </main>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 