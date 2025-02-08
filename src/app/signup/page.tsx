"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import { useTheme } from "@/context/ThemeContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
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
            Create Account
          </h2>
          <p className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
            Join BookItNow today
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <FormInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              theme={theme}
            />
          </div>
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
          <div>
            <FormInput
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              theme={theme}
            />
          </div>

          {/* Google Signup */}
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

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm font-medium"
          >
            Create account
          </button>
        </form>

        {/* Login Link */}
        <p className={`text-center text-sm ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-500 hover:text-indigo-400">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
} 