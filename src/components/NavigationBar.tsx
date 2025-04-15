"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

// Quick links shown in the navigation
const NAVIGATION_LINKS = [
  { label: "Book Flight", icon: "✈️", href: "/book/flight" },
  { label: "Book Bus", icon: "🚌", href: "/book/bus" },
  { label: "Book Movie", icon: "🎬", href: "/book/movie" }
];

/**
 * NavigationBar - Main navigation component for the website
 * 
 * This component provides the top navigation bar with links to
 * different booking options and user authentication.
 */
export default function NavigationBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b ${
      theme === "dark" ? "border-white/10" : "border-gray-200/80"
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-semibold">B</span>
            </div>
            <span className={`text-lg font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              BookItNow
            </span>
          </Link>

          {/* Navigation Links - Only show on medium screens and larger */}
          <div className="hidden md:flex items-center gap-6">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-2 text-sm font-medium ${
                  theme === "dark" ? "text-white/90" : "text-gray-700"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                theme === "dark"
                  ? "bg-white/10 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
              aria-label="Toggle dark/light theme"
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
            </button>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link 
                href="/login"
                className={`px-4 py-2 text-sm font-medium ${
                  theme === "dark" ? "text-white/90" : "text-gray-700"
                }`}
              >
                Log in
              </Link>
              <Link 
                href="/signup"
                className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-full"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 