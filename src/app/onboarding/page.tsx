"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { format } from "date-fns";

const FEATURES = [
  {
    id: 1,
    title: "Flight Bookings",
    description: "Book flights to your dream destinations with the best airlines at competitive prices.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
    icon: "✈️",
    stats: ["500+ Airlines", "Global Coverage", "24/7 Support"],
    benefits: ["Price Alerts", "Seat Selection", "Meal Preferences"]
  },
  {
    id: 2,
    title: "Bus Travel",
    description: "Find and book bus tickets for intercity travel with comfort and convenience.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
    icon: "🚌",
    stats: ["1000+ Routes", "Premium Buses", "Live Tracking"],
    benefits: ["Seat Layout", "Multiple Stops", "Luggage Space"]
  },
  {
    id: 3,
    title: "Movie Tickets",
    description: "Book movie tickets for the latest releases in premium theaters near you.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    icon: "🎬",
    stats: ["2000+ Theaters", "IMAX & 3D", "Instant Booking"],
    benefits: ["Snack Combos", "Premium Seating", "Show Alerts"]
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frequent Traveler",
    image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366F1&color=fff",
    quote: "BookItNow has transformed how I plan my trips. From flights to movies, everything is just a click away!",
    rating: 5,
    bookingType: "Flight Booking"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Traveler",
    image: "https://ui-avatars.com/api/?name=Michael+Chen&background=6366F1&color=fff",
    quote: "The bus booking feature is fantastic! Real-time tracking and premium buses make travel comfortable.",
    rating: 5,
    bookingType: "Bus Travel"
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Movie Enthusiast",
    image: "https://ui-avatars.com/api/?name=Emma+Davis&background=6366F1&color=fff",
    quote: "I love how easy it is to book movie tickets and get the best seats. The snack combos are a great addition!",
    rating: 5,
    bookingType: "Movie Tickets"
  }
];

const STATS = [
  { label: "Happy Customers", value: "1M+", prefix: "👥" },
  { label: "Bookings Made", value: "5M+", prefix: "🎫" },
  { label: "Cities Covered", value: "500+", prefix: "🌆" },
  { label: "Daily Transactions", value: "50K+", prefix: "✅" }
];

const QUICK_LINKS = [
  { label: "Popular Flights", icon: "✈️", link: "/flights/popular" },
  { label: "Bus Routes", icon: "🚌", link: "/bus/routes" },
  { label: "Movie Releases", icon: "🎬", link: "/movies/latest" },
  { label: "Special Offers", icon: "🎯", link: "/offers" }
];

const CustomDatePicker = ({ 
  selected, 
  onChange, 
  placeholder = "Select Date",
  theme 
}: { 
  selected: Date | null; 
  onChange: (date: Date) => void;
  placeholder?: string;
  theme: "light" | "dark";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDay = firstDayOfMonth.getDay();

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onChange(selectedDate);
    setIsOpen(false);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  return (
    <div className="relative" ref={datePickerRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <input
          type="text"
          readOnly
          placeholder={placeholder}
          value={selected ? format(selected, "MMM dd, yyyy") : ""}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all border-0 cursor-pointer"
        />
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl shadow-2xl border border-white/10 w-[300px] ${
            theme === "dark" ? "bg-[#1C1D21]" : "bg-white"
          }`}
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevMonth}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <h3 className="text-white font-medium">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextMonth}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map(day => (
              <div key={day} className="text-center text-white/50 text-sm py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {[...Array(startingDay)].map((_, index) => (
              <div key={`empty-${index}`} className="p-2" />
            ))}
            {[...Array(daysInMonth)].map((_, index) => {
              const day = index + 1;
              const isSelected = selected && 
                selected.getDate() === day && 
                selected.getMonth() === currentDate.getMonth() && 
                selected.getFullYear() === currentDate.getFullYear();
              const isToday = new Date().getDate() === day && 
                new Date().getMonth() === currentDate.getMonth() && 
                new Date().getFullYear() === currentDate.getFullYear();

              return (
                <motion.button
                  key={day}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDateClick(day)}
                  className={`p-2 text-sm rounded-lg transition-colors relative ${
                    isSelected
                      ? "bg-indigo-500 text-white"
                      : isToday
                      ? "bg-white/10 text-white"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {day}
                  {isToday && !isSelected && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default function OnboardingPage() {
  const { theme } = useTheme();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#1C1D21]" : "bg-white"}`}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <span className="text-white font-semibold">B</span>
              </div>
              <span className={`text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                BookItNow
              </span>
            </Link>

            {/* Quick Links */}
            <div className="hidden md:flex items-center gap-6">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.link}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    theme === "dark" ? "text-white/90" : "text-gray-700"
                  } hover:text-indigo-500 transition-colors`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link 
                href="/login"
                className={`px-4 py-2 text-sm font-medium ${
                  theme === "dark" ? "text-white/90" : "text-gray-700"
                } hover:text-indigo-500 transition-colors relative group`}
              >
                Log in
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                href="/signup"
                className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-full hover:bg-indigo-600 transition-all hover:scale-105 transform"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542296332-2e4f23a51bbb"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            quality={100}
            unoptimized
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
          
          {/* Animated Particles Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
          
          {/* Optional: Add a subtle pattern overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 mb-8 shadow-lg">
              <span className="animate-pulse text-xl">🎫</span>
              <span className="font-medium">Your One-Stop Booking Platform</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 text-white">
              Book
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-300"> Flights, Buses & Movies</span>
              <br />
              <span className="text-4xl opacity-90">In One Place</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Experience hassle-free booking for all your travel and entertainment needs.
              <br />
              Join millions of happy customers who trust BookItNow.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                href="/signup"
                className="px-8 py-4 bg-indigo-500 text-white text-lg font-medium rounded-full hover:bg-indigo-600 transition-all hover:scale-105 transform shadow-lg hover:shadow-indigo-500/20"
              >
                Get Started
              </Link>
              <Link
                href="/how-it-works"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white text-lg font-medium rounded-full hover:bg-white/20 transition-all hover:scale-105 transform border border-white/10"
              >
                How It Works
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Best Prices</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Search Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-4xl mx-auto mb-24"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-xl">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {["Flights ✈️", "Buses 🚌", "Movies 🎬"].map((tab, index) => (
                  <motion.button
                    key={tab}
                    onClick={() => setCurrentFeature(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`py-3 px-6 rounded-xl text-sm font-medium transition-all relative overflow-hidden group ${
                      currentFeature === index
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                        : theme === "dark"
                        ? "text-white/70 hover:bg-white/5"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {currentFeature === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-indigo-500 -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </motion.button>
                ))}
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                {/* Dynamic Search Form Based on Selected Tab */}
                {currentFeature === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="From"
                        className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all border-0"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="To"
                        className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all border-0"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <CustomDatePicker
                        selected={selectedDate}
                        onChange={setSelectedDate}
                        theme={theme}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search Flights
                    </motion.button>
                  </motion.div>
                )}
                {currentFeature === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="From City"
                        className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all border-0"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="To City"
                        className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all border-0"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <CustomDatePicker
                        selected={selectedDate}
                        onChange={setSelectedDate}
                        theme={theme}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search Buses
                    </motion.button>
                  </motion.div>
                )}
                {currentFeature === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your city"
                        className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all border-0"
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <select className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all border-0 appearance-none">
                        <option value="" className="bg-gray-900">Select Movie</option>
                        <option value="latest" className="bg-gray-900">Latest Releases</option>
                        <option value="upcoming" className="bg-gray-900">Upcoming</option>
                        <option value="trending" className="bg-gray-900">Trending Now</option>
                        <option value="recommended" className="bg-gray-900">Recommended</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Find Shows
                    </motion.button>
                  </motion.div>
                )}
                {/* Quick Filters */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentFeature === 0 && (
                    <>
                      <button className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs hover:bg-white/10 transition-colors">
                        ⚡ Fastest Routes
                      </button>
                      <button className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs hover:bg-white/10 transition-colors">
                        💰 Best Deals
                      </button>
                      <button className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs hover:bg-white/10 transition-colors">
                        🌟 Premium Airlines
                      </button>
                    </>
                  )}
                  {currentFeature === 1 && (
                    <>
                      <button className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs hover:bg-white/10 transition-colors">
                        🚌 AC Buses
                      </button>
                      <button className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs hover:bg-white/10 transition-colors">
                        🛏️ Sleeper
                      </button>
                      <button className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs hover:bg-white/10 transition-colors">
                        ⚡ Express Routes
                      </button>
                    </>
                  )}
                  {currentFeature === 2 && (
                    <>
                      <button className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs hover:bg-white/10 transition-colors">
                        🎬 IMAX
                      </button>
                      <button className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs hover:bg-white/10 transition-colors">
                        🍿 3D Shows
                      </button>
                      <button className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs hover:bg-white/10 transition-colors">
                        ⭐ Premium Seats
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
          >
            {STATS.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-2xl ${
                  theme === "dark" ? "bg-white/5" : "bg-white"
                } hover:scale-105 transition-transform duration-300 backdrop-blur-sm border border-white/5`}
              >
                <div className="text-4xl mb-3">{stat.prefix}</div>
                <div className={`text-2xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {stat.value}
                </div>
                <div className={`${theme === "dark" ? "text-white/60" : "text-gray-600"} font-medium`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`p-6 rounded-2xl ${
                  theme === "dark" ? "bg-white/5" : "bg-white"
                } hover:scale-105 transition-transform duration-300 group`}
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {feature.title}
                </h3>
                <p className={`mb-4 ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                  {feature.description}
                </p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {feature.stats.map((stat, statIndex) => (
                      <span
                        key={statIndex}
                        className={`text-xs px-3 py-1 rounded-full ${
                          theme === "dark" 
                            ? "bg-white/10 text-white/80" 
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className={`flex items-center gap-2 text-sm ${
                          theme === "dark" ? "text-white/70" : "text-gray-600"
                        }`}
                      >
                        <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className={`py-20 ${theme === "dark" ? "bg-black/30" : "bg-gray-50"} overflow-hidden`}>
        <div className="max-w-[1400px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Discover Our Features
            </h2>
            <p className={`text-xl ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
              Everything you need for seamless booking experiences
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-[600px] rounded-2xl overflow-hidden group"
            >
              <Image
                src={FEATURES[currentFeature].image}
                alt={FEATURES[currentFeature].title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{FEATURES[currentFeature].icon}</span>
                  <h3 className="text-2xl font-bold text-white">
                    {FEATURES[currentFeature].title}
                  </h3>
                </div>
                <p className="text-white/80 mb-4">
                  {FEATURES[currentFeature].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {FEATURES[currentFeature].stats.map((stat, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm"
                    >
                      {stat}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            <div className="space-y-4">
              {FEATURES.map((feature, index) => (
                <motion.button
                  key={feature.id}
                  onClick={() => setCurrentFeature(index)}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`w-full text-left p-6 rounded-xl transition-all ${
                    currentFeature === index
                      ? theme === "dark"
                        ? "bg-white/10 scale-105 shadow-xl shadow-indigo-500/10"
                        : "bg-white shadow-xl shadow-indigo-500/10 scale-105"
                      : theme === "dark"
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-white/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      currentFeature === index
                        ? "bg-indigo-500 text-white"
                        : theme === "dark"
                        ? "bg-white/10 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-1 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={theme === "dark" ? "text-white/60" : "text-gray-600"}>
                        {feature.description}
                      </p>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentFeature === index
                        ? "bg-indigo-500 text-white"
                        : theme === "dark"
                        ? "bg-white/10 text-white/60"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
        <div className="max-w-[1400px] mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
              theme === "dark" ? "bg-white/5 text-white/90" : "bg-gray-100 text-gray-700"
            }`}>
              Testimonials
            </span>
            <h2 className={`text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              What Our Users Say
            </h2>
            <p className={`text-xl ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
              Join thousands of satisfied customers who trust BookItNow
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`p-8 rounded-2xl ${
                  theme === "dark" ? "bg-white/5" : "bg-white"
                } hover:scale-105 transition-transform duration-300 relative group`}
              >
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">
                  <span className="text-white text-lg">❝</span>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="rounded-full ring-4 ring-indigo-500/10"
                    unoptimized
                  />
                  <div>
                    <h4 className={`font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {testimonial.name}
                    </h4>
                    <p className={theme === "dark" ? "text-white/60" : "text-gray-600"}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.span 
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-yellow-400"
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>
                  <span className={`text-sm ${
                    theme === "dark" ? "text-white/40" : "text-gray-500"
                  }`}>
                    • {testimonial.bookingType}
                  </span>
                </div>
                <p className={`text-lg ${theme === "dark" ? "text-white/80" : "text-gray-700"}`}>
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-32 relative ${theme === "dark" ? "bg-black/30" : "bg-gray-50"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="max-w-[1400px] mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${
              theme === "dark" ? "bg-white/5 text-white/90" : "bg-gray-100 text-gray-700"
            }`}>
              Get Started Today
            </span>
            <h2 className={`text-5xl font-bold mb-6 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              Ready to Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-300"> Booking Experience?</span>
            </h2>
            <p className={`text-xl mb-12 ${
              theme === "dark" ? "text-white/60" : "text-gray-600"
            }`}>
              Join millions of users who trust BookItNow for their travel and entertainment needs.
              Experience the future of booking today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-indigo-500 text-white text-lg font-medium rounded-full hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                >
                  <span>Create Your Account</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className={`px-8 py-4 text-lg font-medium rounded-full transition-colors flex items-center gap-2 ${
                    theme === "dark"
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  <span>Contact Sales</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${theme === "dark" ? "border-t border-white/10" : "border-t"}`}>
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <span className="text-white font-semibold">B</span>
                </div>
                <span className={`text-lg font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  BookItNow
                </span>
              </Link>
              <p className={`mb-4 ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                Your one-stop platform for booking flights, buses, and movie tickets.
                Experience hassle-free booking with our secure and user-friendly service.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map(social => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === "dark"
                        ? "bg-white/10 hover:bg-white/20"
                        : "bg-gray-100 hover:bg-gray-200"
                    } transition-colors`}
                  >
                    <span className="text-xl">
                      {social === "twitter" && "𝕏"}
                      {social === "facebook" && "f"}
                      {social === "instagram" && "📸"}
                      {social === "linkedin" && "in"}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Services
              </h4>
              <ul className={`space-y-2 ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                <li><Link href="/flights" className="hover:text-indigo-500 transition-colors">Flight Booking</Link></li>
                <li><Link href="/buses" className="hover:text-indigo-500 transition-colors">Bus Tickets</Link></li>
                <li><Link href="/movies" className="hover:text-indigo-500 transition-colors">Movie Shows</Link></li>
                <li><Link href="/offers" className="hover:text-indigo-500 transition-colors">Special Offers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Company
              </h4>
              <ul className={`space-y-2 ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                <li><Link href="/about" className="hover:text-indigo-500 transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-indigo-500 transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-indigo-500 transition-colors">Blog</Link></li>
                <li><Link href="/press" className="hover:text-indigo-500 transition-colors">Press</Link></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Support
              </h4>
              <ul className={`space-y-2 ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}>
                <li><Link href="/help" className="hover:text-indigo-500 transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-indigo-500 transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-indigo-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-indigo-500 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className={`mt-12 pt-8 border-t ${
            theme === "dark" ? "border-white/10" : "border-gray-200"
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className={theme === "dark" ? "text-white/60" : "text-gray-600"}>
                © 2024 BookItNow. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {/* Payment Method Icons */}
                <div className="flex items-center gap-4">
                  <span className={theme === "dark" ? "text-white/60" : "text-gray-600"}>Payment Methods:</span>
                  <div className="flex gap-3">
                    <div className={`px-3 py-1.5 rounded-md ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}`}>
                      <span className="text-sm">Visa</span>
                    </div>
                    <div className={`px-3 py-1.5 rounded-md ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}`}>
                      <span className="text-sm">Mastercard</span>
                    </div>
                    <div className={`px-3 py-1.5 rounded-md ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}`}>
                      <span className="text-sm">PayPal</span>
                    </div>
                    <div className={`px-3 py-1.5 rounded-md ${theme === "dark" ? "bg-white/10" : "bg-gray-100"}`}>
                      <span className="text-sm">UPI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}