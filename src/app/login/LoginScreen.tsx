"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout, FormInput } from "@/components/auth";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import UserService from "@/utils/UserService";

export default function LoginScreen() {
  // Page state
  const router = useRouter();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Make API call to login endpoint
      const loginData = await UserService.login({
        user_email: email,
        user_password: password
      });
      
      // Store auth token if provided
      if (loginData.token) {
        localStorage.setItem('authToken', loginData.token);
      }
      
      // Create user object from response
      const user = {
        id: loginData.userId || '',
        user_name: loginData.user_name || '',
        user_email: email,
        user_phone: loginData.user_phone || '',
        user_role: loginData.user_role || 'user'
      };
      
      // Log the user in via context
      login(user);

      // Redirect based on user role
      if (user.user_role === "admin") {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      theme={theme}
      onThemeToggle={toggleTheme}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className={`text-3xl font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Welcome Back
          </h2>
          <p className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
            Sign in to your account
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 text-sm rounded-lg bg-red-500/10 text-red-500">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <FormInput
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="Email"
              required
              theme={theme}
            />
          </div>
          <div>
            <FormInput
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm ${
              theme === "dark"
                ? "bg-white/5 text-white"
                : "bg-gray-100 text-gray-900"
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
            className={`w-full py-3 px-4 bg-indigo-500 text-white rounded-lg text-sm font-medium
              ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
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

        {/* Test credentials info */}
        <div className={`text-xs rounded-lg p-2 ${theme === "dark" ? "bg-indigo-950/30 text-indigo-200" : "bg-indigo-50 text-indigo-700"}`}>
          <p className="font-medium">Test the API with:</p>
          <p className="mt-1">Email: yogesh@example.com</p>
          <p>Password: securepassword</p>
        </div>

        {/* Sign up link */}
        <div className="text-center">
          <span className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
            Don't have an account?{" "}
          </span>
          <Link href="/signup" className="text-indigo-500 hover:text-indigo-400">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
} 