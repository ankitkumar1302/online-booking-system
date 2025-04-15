"use client";

import React from 'react';

// Props for SimpleTextInput component
interface SimpleTextInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  theme: "light" | "dark";
}

/**
 * SimpleTextInput - A reusable input field component
 * 
 * This component provides consistent styling for text inputs
 * throughout the authentication screens.
 */
export default function SimpleTextInput({
  type,
  value,
  onChange,
  placeholder,
  required = false,
  theme
}: SimpleTextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-3 rounded-lg text-sm ${
        theme === "dark"
          ? "bg-white/5 text-white border border-white/10 focus:border-indigo-500"
          : "bg-gray-100 text-gray-900 border border-gray-200 focus:border-indigo-500"
      } outline-none transition-colors`}
    />
  );
} 