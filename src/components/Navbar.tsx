"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const QUICK_LINKS = [
  { label: "Book Flight", icon: "✈️", href: "/book/flight" },
  { label: "Book Bus", icon: "🚌", href: "/book/bus" },
  { label: "Book Movie", icon: "🎬", href: "/book/movie" }
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b ${
        theme === "dark" ? "border-white/10" : "border-gray-200/80"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-semibold">B</span>
            </div>
            <span className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              BookItNow
            </span>
          </Link>

          {/* Quick Links */}
          <div className="hidden md:flex items-center gap-6">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium ${
                  theme === "dark" ? "text-white/90" : "text-gray-700"
                } hover:text-indigo-500 transition-colors`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900"
              }`}
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

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link 
                href="/login"
                className={`px-4 py-2 text-sm font-medium ${
                  theme === "dark" ? "text-white/90" : "text-gray-700"
                } hover:text-indigo-500 transition-colors relative group`}
              >
                Log in
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/signup"
                className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-full hover:bg-indigo-600 transition-all hover:scale-105 transform"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
} 