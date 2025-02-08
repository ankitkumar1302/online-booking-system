"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const SHOWCASE_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    title: "Modern Office",
    author: "John.booking",
    role: "Business Manager"
  },
  {
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    title: "Meeting Room",
    author: "Sarah.space",
    role: "Space Designer"
  },
  {
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    title: "Conference Room",
    author: "Mike.venue",
    role: "Venue Manager"
  }
];

interface AuthLayoutProps {
  children: ReactNode;
  theme: "light" | "dark";
  currentImageIndex: number;
  onPreviousImage: () => void;
  onNextImage: () => void;
  onThemeToggle: () => void;
}

export default function AuthLayout({
  children,
  theme,
  currentImageIndex,
  onPreviousImage,
  onNextImage,
  onThemeToggle
}: AuthLayoutProps) {
  const currentImage = SHOWCASE_IMAGES[currentImageIndex];

  return (
    <div className={`min-h-screen w-full p-4 md:p-6 lg:p-8 flex items-center justify-center transition-all ${
      theme === "dark" 
        ? "bg-[#111111] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" 
        : "bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,216,255,0.5),rgba(255,255,255,0))]"
    }`}>
      <div className={`w-full max-w-[1400px] h-[800px] mx-auto rounded-[32px] overflow-hidden flex relative ${
        theme === "dark"
          ? "bg-[#151515] ring-1 ring-white/10"
          : "bg-white ring-1 ring-black/5"
      }`}>
        {/* Left Section - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src={currentImage.url}
              alt="Scenic Workspace"
              fill
              className="object-cover transition-opacity duration-500 brightness-[0.9]"
              priority
              unoptimized
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 ${
              theme === "dark"
                ? "bg-gradient-to-t from-[#151515] via-transparent to-transparent"
                : "bg-gradient-to-t from-white via-transparent to-transparent"
            }`} />
          </div>
          {/* Navigation */}
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-10">
            <div>
              <Link 
                href="/venues" 
                className={`text-sm px-5 py-2.5 rounded-full transition-colors ${
                  theme === "dark"
                    ? "text-white/90 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                    : "text-gray-600 hover:text-gray-900 bg-black/5 hover:bg-black/10 backdrop-blur-sm"
                }`}
              >
                Browse Venues
              </Link>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/login" 
                className={`text-sm px-5 py-2.5 rounded-full transition-colors ${
                  theme === "dark"
                    ? "text-white/90 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                    : "text-gray-600 hover:text-gray-900 bg-black/5 hover:bg-black/10 backdrop-blur-sm"
                }`}
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className={`text-sm px-5 py-2.5 rounded-full transition-colors ${
                  theme === "dark"
                    ? "text-white/90 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                    : "text-gray-600 hover:text-gray-900 bg-black/5 hover:bg-black/10 backdrop-blur-sm"
                }`}
              >
                Sign Up
              </Link>
            </div>
          </div>
          {/* Profile Section */}
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-10">
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
                  {currentImage.author}
                </h3>
                <p className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
                  {currentImage.role}
                </p>
              </div>
            </div>
            {/* Navigation Dots */}
            <div className="flex gap-2">
              <button 
                onClick={onPreviousImage}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  theme === "dark"
                    ? "text-white/90 hover:text-white bg-white/5 hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 bg-black/5 hover:bg-black/10"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={onNextImage}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                  theme === "dark"
                    ? "text-white/90 hover:text-white bg-white/5 hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 bg-black/5 hover:bg-black/10"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className={`w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-14 transition-colors ${
          theme === "dark" ? "bg-[#151515]" : "bg-white"
        }`}>
          <div className="w-full max-w-md space-y-8">
            {/* Header with Language and Theme Selection */}
            <div className="flex justify-between items-center">
              <h1 className={`text-xl font-semibold tracking-tight ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                BookItNow
              </h1>
              <div className="flex items-center gap-2">
                <button 
                  onClick={onThemeToggle}
                  className={`p-2 rounded-full transition-colors ${
                    theme === "dark"
                      ? "text-white/80 hover:text-white bg-white/5 hover:bg-white/10"
                      : "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200"
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
                <button className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition-colors ${
                  theme === "dark"
                    ? "text-white/80 hover:text-white bg-white/5 hover:bg-white/10"
                    : "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200"
                }`}>
                  <span>EN</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form Content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 