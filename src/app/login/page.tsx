"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import { useTheme } from "@/context/ThemeContext";

const SHOWCASE_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1518655048521-f130df041f66",
    title: "Workspace",
    author: "Andrew.ui",
    role: "UI & Illustration"
  },
  {

    url: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    title: "Creative Space",
    author: "Sarah.design",
    role: "Visual Designer"
  },
  {
    url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead",
    title: "Design Studio",
    author: "Mike.photo",
    role: "Photographer"
  }
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + 3) % 3);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % 3);
  };

  return (
    <AuthLayout
      theme={theme}
      currentImageIndex={currentImageIndex}
      onPreviousImage={handlePreviousImage}
      onNextImage={handleNextImage}
      onThemeToggle={toggleTheme}
    >
      <div className="space-y-6">
        <div>
          <h2 className={`text-3xl font-semibold tracking-tight ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Welcome Back
          </h2>
          <p className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <FormInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              theme={theme}
            />
          </div>
          <div>
            <FormInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              theme={theme}
            />
          </div>
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-indigo-500 hover:text-indigo-400">
              Forgot password?
            </Link>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors ${
              theme === "dark"
                ? "bg-white/5 text-white hover:bg-white/10"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            <Image 
              src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
              alt="Google"
              width={18}
              height={18}
              unoptimized
            />
            <span>Continue with Google</span>
          </button>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm font-medium"
          >
            Sign in to account
          </button>
        </form>

        {/* Sign Up Link */}
        <p className={`text-center text-sm ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
          Don't have an account?{" "}
          <Link href="/signup" className="text-indigo-500 hover:text-indigo-400">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
} 