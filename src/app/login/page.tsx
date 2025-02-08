"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

// Mock user data - Replace this with your actual API integration
const MOCK_USERS = {
  "admin@bookit.com": {
    password: "admin123",
    role: "admin",
    name: "Admin User"
  },
  "user@bookit.com": {
    password: "user123",
    role: "user",
    name: "Normal User"
  }
};

type UserRole = "admin" | "user";

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
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = MOCK_USERS[email as keyof typeof MOCK_USERS];
      
      if (!user || user.password !== password) {
        throw new Error("Invalid email or password");
      }

      // Use the login function from auth context
      login({
        email,
        role: user.role as "admin" | "user",
        name: user.name
      });

      // Redirect based on user role
      if (user.role === "admin") {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

        {error && (
          <div className="p-3 text-sm rounded-lg bg-red-500/10 text-red-500">
            {error}
          </div>
        )}

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
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-indigo-500 text-white rounded-lg transition-colors text-sm font-medium
              ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-600'}
              flex items-center justify-center gap-2
            `}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              'Sign in to account'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className={`text-xs ${theme === "dark" ? "text-white/40" : "text-gray-400"}`}>
          <p className="text-center">Demo Credentials:</p>
          <div className="mt-1 space-y-1">
            <p>Admin: admin@bookit.com / admin123</p>
            <p>User: user@bookit.com / user123</p>
          </div>
        </div>

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