"use client";

import Link from "next/link";
import NavigationBar from "@/components/NavigationBar";
import { useTheme } from "@/context/ThemeContext";

/**
 * HomeScreen - The landing page for the application
 * 
 * This component displays the main entry point with booking options
 * and calls-to-action.
 */
export default function HomeScreen() {
  const { theme } = useTheme();
  
  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
      {/* Navigation */}
      <NavigationBar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Book <span className="text-indigo-500">Everything</span> in One Place
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-80">
            The easiest way to book flights, movies, and bus tickets with just a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup" 
              className="px-8 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600"
            >
              Get Started
            </Link>
            <Link 
              href="/login" 
              className={`px-8 py-3 rounded-lg font-medium ${
                theme === "dark" 
                  ? "bg-white/10 hover:bg-white/20" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Log In
            </Link>
          </div>
        </div>
      </section>
      
      {/* Booking Options */}
      <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What would you like to book?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Flight Booking */}
          <div className={`p-6 rounded-xl ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-50"
          }`}>
            <div className="text-3xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold mb-2">Flight Tickets</h3>
            <p className="opacity-80 mb-4">Find the best deals on flights worldwide with our easy booking system.</p>
            <Link 
              href="/book/flight" 
              className="text-indigo-500 font-medium hover:underline"
            >
              Book a flight →
            </Link>
          </div>
          
          {/* Movie Booking */}
          <div className={`p-6 rounded-xl ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-50"
          }`}>
            <div className="text-3xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">Movie Tickets</h3>
            <p className="opacity-80 mb-4">Get tickets for the latest blockbusters at theaters near you.</p>
            <Link 
              href="/book/movie" 
              className="text-indigo-500 font-medium hover:underline"
            >
              Book a movie →
            </Link>
          </div>
          
          {/* Bus Booking */}
          <div className={`p-6 rounded-xl ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-50"
          }`}>
            <div className="text-3xl mb-4">🚌</div>
            <h3 className="text-xl font-semibold mb-2">Bus Tickets</h3>
            <p className="opacity-80 mb-4">Find comfortable and affordable bus travel for your next journey.</p>
            <Link 
              href="/book/bus" 
              className="text-indigo-500 font-medium hover:underline"
            >
              Book a bus →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 