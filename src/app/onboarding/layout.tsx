"use client";

import { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1C1D21]" : "bg-white"}`}>
      {children}
    </div>
  );
} 