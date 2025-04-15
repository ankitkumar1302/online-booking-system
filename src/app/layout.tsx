import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProviders from "./AppProviders";

// Set up fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define the app metadata
export const metadata: Metadata = {
  title: "BookItNow - Online Booking System",
  description: "A modern online booking system for flights, buses, and movies",
};

/**
 * RootLayout - The main layout wrapper for the entire application
 * 
 * This component sets up the HTML structure and global providers.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
