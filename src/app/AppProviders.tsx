"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

/**
 * AppProviders - Wraps the application with necessary context providers
 * 
 * This component provides theme and authentication context to the entire app.
 */
interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--toast-bg)",
              color: "var(--toast-color)",
              border: "1px solid var(--toast-border)",
            },
          }}
        />
      </ThemeProvider>
    </AuthProvider>
  );
} 