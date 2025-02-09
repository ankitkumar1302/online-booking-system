"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1C1D21]" : "bg-gray-50"}`}>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${
        theme === "dark" ? "bg-[#1C1D21]/80" : "bg-white/80"
      } backdrop-blur-lg border-b ${theme === "dark" ? "border-white/10" : "border-gray-200"}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
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
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                href="/dashboard" 
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Home
              </Link>
              <Link 
                href="/properties" 
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Properties
              </Link>
              <Link 
                href="/members" 
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Members
              </Link>
              <Link 
                href="/blogs" 
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Blogs
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Log in
              </Link>
              <Link 
                href="/signup" 
                className="text-sm font-medium px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Partner Logos */}
      <div className={`fixed bottom-0 left-0 right-0 ${
        theme === "dark" ? "bg-[#1C1D21]/80" : "bg-white/80"
      } backdrop-blur-lg border-t ${theme === "dark" ? "border-white/10" : "border-gray-200"}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Image
              src="/airbnb.svg"
              alt="Airbnb"
              width={100}
              height={32}
              className="grayscale opacity-50 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/cisco.svg"
              alt="Cisco"
              width={100}
              height={32}
              className="grayscale opacity-50 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/ebay.svg"
              alt="eBay"
              width={100}
              height={32}
              className="grayscale opacity-50 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/microsoft.svg"
              alt="Microsoft"
              width={100}
              height={32}
              className="grayscale opacity-50 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 