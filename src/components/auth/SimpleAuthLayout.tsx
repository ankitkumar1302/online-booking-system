"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

// Props for the SimpleAuthLayout component
interface SimpleAuthLayoutProps {
  children: ReactNode;
  theme: "light" | "dark";
  onThemeToggle: () => void;
}

/**
 * SimpleAuthLayout - A clean layout for authentication screens
 * 
 * This component provides a consistent layout for login, signup, 
 * and other authentication-related screens.
 */
export default function SimpleAuthLayout({
  children,
  theme,
  onThemeToggle
}: SimpleAuthLayoutProps) {
  // Image to display on the left side
  const backgroundImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c";
  const authorName = "John Doe";
  const authorRole = "Business Manager";

  return (
    <div className={`min-h-screen w-full flex items-center justify-center ${
      theme === "dark" ? "bg-gray-900" : "bg-white"
    }`}>
      <div className={`w-full max-w-[1400px] h-[800px] mx-auto rounded-[32px] overflow-hidden flex relative ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        {/* Left Section - Background Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt="Scenic Workspace"
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className={`absolute inset-0 ${
              theme === "dark"
                ? "bg-gradient-to-t from-gray-800 via-transparent to-transparent"
                : "bg-gradient-to-t from-white via-transparent to-transparent"
            }`} />
          </div>
          
          {/* Navigation Links */}
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-10">
            <div>
              <Link 
                href="/" 
                className={`text-sm px-5 py-2.5 rounded-full ${
                  theme === "dark" ? "text-white/90 bg-white/5" : "text-gray-600 bg-black/5"
                }`}
              >
                Home
              </Link>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/login" 
                className={`text-sm px-5 py-2.5 rounded-full ${
                  theme === "dark" ? "text-white/90 bg-white/5" : "text-gray-600 bg-black/5"
                }`}
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className={`text-sm px-5 py-2.5 rounded-full ${
                  theme === "dark" ? "text-white/90 bg-white/5" : "text-gray-600 bg-black/5"
                }`}
              >
                Sign Up
              </Link>
            </div>
          </div>
          
          {/* Author Info */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-black/5">
                <Image
                  src="https://ui-avatars.com/api/?name=BookItNow&background=6366F1&color=fff"
                  alt="Profile"
                  width={48}
                  height={48}
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <h3 className={`font-medium ${theme === "dark" ? "text-white/90" : "text-gray-700"}`}>
                  {authorName}
                </h3>
                <p className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
                  {authorRole}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form Content */}
        <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-14 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}>
          <div className="w-full max-w-md space-y-8">
            {/* Header with App Name and Theme Toggle */}
            <div className="flex justify-between items-center">
              <h1 className={`text-xl font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                BookItNow
              </h1>
              <button 
                onClick={onThemeToggle}
                className={`p-2 rounded-full ${
                  theme === "dark" ? "text-white/80 bg-white/5" : "text-gray-600 bg-gray-100"
                }`}
              >
                {theme === "dark" ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Main Content - Children */}
            <div className={theme === "dark" ? "text-white/90" : "text-gray-700"}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 