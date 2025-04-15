"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SimpleAuthLayout from "@/components/auth/SimpleAuthLayout";
import SimpleTextInput from "@/components/auth/SimpleTextInput";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import UserService from "@/utils/UserService";

/**
 * SignupScreen - Component for user registration
 * 
 * This screen allows new users to create an account.
 */
export default function SignupScreen() {
  // Page state
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { login } = useAuth();
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle signup form submission
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }
    
    // Clear any errors
    setError("");
    
    try {
      // Make API call to signup endpoint
      const signupData = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_password: password,
        user_role: "user" as const
      };
      
      await UserService.signup(signupData);
      
      // Now login the user
      const loginData = await UserService.login({
        user_email: email,
        user_password: password
      });
      
      // Create the user account with API response data
      const newUser = {
        id: loginData.userId,
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_role: "user" as const
      };
      
      // Save user to auth context
      login(newUser);
      
      // Store a flag to indicate this is a new user
      localStorage.setItem('isNewUser', 'true');
      
      // Store auth token if provided in response
      if (loginData.token) {
        localStorage.setItem('authToken', loginData.token);
      }
      
      // Make sure onboarding cookie doesn't exist (if user previously abandoned onboarding)
      document.cookie = 'onboarding_completed=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      
      // Redirect to onboarding
      router.push('/user-onboarding');
    } catch (err: any) {
      console.error('Error during signup:', err);
      setError(err.message || 'An error occurred during signup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SimpleAuthLayout
      theme={theme}
      onThemeToggle={toggleTheme}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className={`text-3xl font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Create Account
          </h2>
          <p className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
            Join BookItNow today
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 text-sm rounded-lg bg-red-500/10 text-red-500">
            {error}
          </div>
        )}

        {/* Signup form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <SimpleTextInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              theme={theme}
            />
          </div>
          <div>
            <SimpleTextInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              theme={theme}
            />
          </div>
          <div>
            <SimpleTextInput
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
              theme={theme}
            />
          </div>
          <div>
            <SimpleTextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              theme={theme}
            />
          </div>
          <div>
            <SimpleTextInput
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

          {/* Signup Button */}
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
                <span>Creating account...</span>
              </>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <span className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
            Already have an account?{" "}
          </span>
          <Link href="/login" className="text-indigo-500 hover:text-indigo-400">
            Sign in
          </Link>
        </div>
      </div>
    </SimpleAuthLayout>
  );
}