"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import UserDashboardLayout from "@/components/dashboard/UserDashboardLayout";
import { motion } from "framer-motion";

// Mock data - Replace with API call
const TICKETS = [
  {
    id: 1,
    type: "Flight",
    title: "Jakarta to Bali",
    company: "Garuda Indonesia",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
    price: 150,
    time: "07:00 AM",
    date: "2024-03-25",
    specs: {
      duration: "1h 50m",
      class: "Economy",
      seats: "12 seats left"
    },
    rating: 4.8,
    reviews: 234,
    featured: true
  },
  {
    id: 2,
    type: "Movie",
    title: "Dune: Part Two",
    company: "CGV Cinemas",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    price: 12,
    time: "15:30 PM",
    date: "2024-03-20",
    specs: {
      duration: "2h 46m",
      screen: "IMAX",
      seats: "86 seats left"
    },
    rating: 4.9,
    reviews: 512,
    featured: true
  },
  {
    id: 3,
    type: "Bus",
    title: "Jakarta to Bandung",
    company: "Executive Bus",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
    price: 25,
    time: "09:00 AM",
    date: "2024-03-22",
    specs: {
      duration: "3h 30m",
      class: "Executive",
      seats: "28 seats left"
    },
    rating: 4.7,
    reviews: 189,
    featured: false
  }
];

// Add image gallery data
const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    title: "Luxury Flight Experience"
  },
  {
    url: "https://images.unsplash.com/photo-1568495248636-6432b97bd949",
    title: "Movie Premiere Night"
  },
  {
    url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e",
    title: "Executive Bus Travel"
  },
  {
    url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
    title: "Destination Highlights"
  }
];

// Add hero background images array after the GALLERY_IMAGES constant
const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    alt: "Scenic Mountain View"
  },
  {
    url: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd",
    alt: "Luxury Hotel Interior"
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    alt: "Sunset Beach"
  },
  {
    url: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d",
    alt: "City Skyline"
  }
];

export default function UserDashboardPage() {
  const { theme } = useTheme();
  const [ticketType, setTicketType] = useState("Show all");
  const [priceRange, setPriceRange] = useState("Any price");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState(TICKETS);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Price range values in USD
  const PRICE_RANGES = {
    "Any price": [0, Infinity],
    "Under $50": [0, 50],
    "$50 - $200": [50, 200],
    "$200+": [200, Infinity]
  };

  // Filter tickets based on search criteria
  useEffect(() => {
    let filtered = TICKETS;

    if (ticketType !== "Show all") {
      filtered = filtered.filter(ticket => ticket.type === ticketType);
    }

    const [minPrice, maxPrice] = PRICE_RANGES[priceRange as keyof typeof PRICE_RANGES];
    filtered = filtered.filter(ticket => ticket.price >= minPrice && ticket.price <= maxPrice);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ticket => 
        ticket.title.toLowerCase().includes(query) ||
        ticket.company.toLowerCase().includes(query)
      );
    }

    setFilteredTickets(filtered);
  }, [ticketType, priceRange, searchQuery]);

  // Add this effect after existing effects
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <UserDashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Hero Section - Full Width with Rounded Corners */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="relative h-full">
            {/* Background Image/Video with Overlay */}
            <div className="absolute inset-0 w-full h-full">
              <motion.div
                key={currentImageIndex}
                initial={{ x: direction * 100 + "%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -100 + "%", opacity: 0 }}
                transition={{ type: "tween", duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={HERO_IMAGES[currentImageIndex].url}
                  alt={HERO_IMAGES[currentImageIndex].alt}
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
              </motion.div>

              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
                {HERO_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentImageIndex ? 1 : -1);
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? "w-6 bg-white" 
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => {
                  setDirection(-1);
                  setCurrentImageIndex((prevIndex) => 
                    prevIndex === 0 ? HERO_IMAGES.length - 1 : prevIndex - 1
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white/90 hover:bg-black/40 hover:text-white transition-all z-10"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  setDirection(1);
                  setCurrentImageIndex((prevIndex) => 
                    (prevIndex + 1) % HERO_IMAGES.length
                  );
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white/90 hover:bg-black/40 hover:text-white transition-all z-10"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-1/4 left-[10%] w-24 h-24 rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
                  alt="Flight"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="absolute top-1/3 right-[15%] w-32 h-32 rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
                  alt="Movie"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1 }}
                className="absolute bottom-1/4 left-[20%] w-28 h-28 rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957"
                  alt="Bus"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            {/* Hero Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-lg text-white border border-white/20">
                    <span className="animate-pulse mr-2">✨</span>
                    <span className="text-sm font-medium">Special 30% Off On First Booking</span>
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                    Your Journey<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      Begins Here
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
                    Book Flights, Movies & Bus Tickets<br />
                    All in One Place
                  </p>
                </motion.div>

                {/* Enhanced Search Box */}
                <motion.form 
                  onSubmit={handleSearch}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mt-12 max-w-4xl mx-auto"
                >
                  <div className={`bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl transition-all duration-300 ${
                    isSearchFocused ? 'ring-4 ring-indigo-500/30 transform scale-[1.02]' : ''
                  }`}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setIsSearchFocused(false)}
                          placeholder="Where to?"
                          className="w-full pl-10 pr-3 py-3.5 text-gray-900 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none bg-gray-50/80 hover:bg-gray-50 transition-colors"
                        />
                      </div>

                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full pl-10 pr-3 py-3.5 text-gray-900 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none bg-gray-50/80 hover:bg-gray-50 transition-colors"
                        />
                      </div>

                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <select 
                          value={ticketType}
                          onChange={(e) => setTicketType(e.target.value)}
                          className="w-full pl-10 pr-3 py-3.5 text-gray-900 rounded-xl border-2 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none bg-gray-50/80 hover:bg-gray-50 transition-colors appearance-none cursor-pointer"
                        >
                          <option>Show all</option>
                          <option>Flight</option>
                          <option>Movie</option>
                          <option>Bus</option>
                        </select>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3.5 px-6 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </motion.form>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Selection Section - Similar to Onboarding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <div className={`rounded-[2rem] ${
            theme === "dark" ? "bg-white/5" : "bg-white"
          } p-8 border border-gray-100 dark:border-white/10 shadow-xl`}>
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                What would you like to book today?
              </h2>
              <p className={`mt-2 ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
                Select your booking preference
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: "flights",
                  label: "Book Flights",
                  icon: "✈️",
                  description: "Domestic & International flights",
                  color: "from-sky-400 to-blue-500"
                },
                {
                  id: "movies",
                  label: "Book Movies",
                  icon: "🎬",
                  description: "Latest movies & shows",
                  color: "from-purple-400 to-pink-500"
                },
                {
                  id: "buses",
                  label: "Book Buses",
                  icon: "🚌",
                  description: "Inter-city bus tickets",
                  color: "from-green-400 to-emerald-500"
                }
              ].map((option) => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group p-6 rounded-2xl border-2 transition-all relative cursor-pointer ${
                    theme === "dark"
                      ? "border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10"
                      : "border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50"
                  } hover:shadow-xl`}
                >
                  <div className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center text-3xl`}>
                    {option.icon}
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {option.label}
                  </h3>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-white/50" : "text-gray-500"
                  }`}>
                    {option.description}
                  </p>
                  
                  <div className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transform transition-all ${
                    theme === "dark"
                      ? "bg-white/10 group-hover:bg-white/20"
                      : "bg-gray-100 group-hover:bg-gray-200"
                  }`}>
                    <svg className={`w-4 h-4 ${
                      theme === "dark" ? "text-white" : "text-gray-600"
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Travel Preferences */}
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Travel Preferences
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { id: "domestic", label: "Domestic", icon: "🏠" },
                  { id: "international", label: "International", icon: "🌎" },
                  { id: "business", label: "Business", icon: "💼" },
                  { id: "leisure", label: "Leisure", icon: "🏖️" }
                ].map((pref) => (
                  <motion.button
                    key={pref.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-xl border transition-all ${
                      theme === "dark"
                        ? "border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10"
                        : "border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{pref.icon}</div>
                    <div className={`text-sm font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {pref.label}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Entertainment Preferences */}
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
              <h3 className={`text-lg font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Entertainment Preferences
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { id: "action", label: "Action", icon: "💥" },
                  { id: "comedy", label: "Comedy", icon: "😄" },
                  { id: "drama", label: "Drama", icon: "🎭" },
                  { id: "scifi", label: "Sci-Fi", icon: "🚀" }
                ].map((genre) => (
                  <motion.button
                    key={genre.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 rounded-xl border transition-all ${
                      theme === "dark"
                        ? "border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10"
                        : "border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                  >
                    <div className="text-2xl mb-2">{genre.icon}</div>
                    <div className={`text-sm font-medium ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      {genre.label}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Container */}
        <div className="max-w-[1400px] mx-auto space-y-12">
          {/* Quick Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              { icon: "✈️", title: "Flights", desc: "Domestic & International", color: "from-sky-400 to-blue-500" },
              { icon: "🎬", title: "Movies", desc: "Latest Releases & Shows", color: "from-purple-400 to-pink-500" },
              { icon: "🚌", title: "Bus", desc: "Inter-city Travel", color: "from-green-400 to-emerald-500" }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-8 rounded-2xl cursor-pointer transition-all duration-200 ${
                  theme === "dark" ? "bg-white/5 hover:bg-white/10" : "bg-white hover:bg-gray-50"
                } shadow-lg hover:shadow-xl border border-gray-100 dark:border-white/10`}
              >
                <div className={`text-4xl mb-4 p-3 rounded-xl inline-block bg-gradient-to-br ${category.color} bg-opacity-10`}>
                  {category.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {category.title}
                </h3>
                <p className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
                  {category.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Tickets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="max-w-7xl mx-auto rounded-[2rem] overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className={`text-3xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  Featured Tickets
                </h2>
                <p className={`mt-2 ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
                  Handpicked deals for you
                </p>
              </div>
              <div className="flex items-center gap-4">
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className={`px-4 py-2 rounded-lg border ${
                    theme === "dark" ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  <option>Any price</option>
                  <option>Under $50</option>
                  <option>$50 - $200</option>
                  <option>$200+</option>
                </select>
                <p className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
                  {filteredTickets.length} options
                </p>
              </div>
            </div>
            
            {filteredTickets.length === 0 ? (
              <div className={`text-center py-12 ${
                theme === "dark" ? "text-white/50" : "text-gray-500"
              }`}>
                No tickets found matching your criteria
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className={`group rounded-2xl overflow-hidden ${
                      theme === "dark" ? "bg-white/5" : "bg-white"
                    } hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-white/10`}
                  >
                    <div className="relative h-48">
                      <Image
                        src={ticket.image}
                        alt={ticket.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-900">
                          {ticket.type}
                        </span>
                        {ticket.featured && (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-sm font-medium ${
                          theme === "dark" ? "text-white/70" : "text-gray-600"
                        }`}>
                          {ticket.company}
                        </span>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className={`text-sm font-medium ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}>
                            {ticket.rating}
                          </span>
                          <span className={`text-sm ${
                            theme === "dark" ? "text-white/50" : "text-gray-500"
                          }`}>
                            ({ticket.reviews})
                          </span>
                        </div>
                      </div>
                      <h3 className={`text-xl font-semibold mb-4 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        {ticket.title}
                      </h3>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
                              {ticket.specs.duration}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className={theme === "dark" ? "text-white/50" : "text-gray-500"}>
                              {ticket.specs.class || ticket.specs.screen}
                            </span>
                          </div>
                        </div>
                        <span className={`text-sm font-medium ${
                          theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                        }`}>
                          {ticket.specs.seats}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
                            {ticket.date} • {ticket.time}
                          </p>
                          <p className={`text-2xl font-bold mt-1 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}>
                            {formatPrice(ticket.price)}
                          </p>
                        </div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link
                            href={`/booking/${ticket.id}`}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg"
                          >
                            Book Now
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Enhanced Partners & Gallery Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            {/* Partners */}
            <div className={`rounded-[2rem] ${theme === "dark" ? "bg-white/5" : "bg-white"} p-8 sm:p-12 border border-gray-100 dark:border-white/10 mb-12 shadow-xl`}>
              <h3 className={`text-center text-2xl font-semibold mb-8 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                Trusted by World's Best Companies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 items-center justify-items-center">
                <motion.div whileHover={{ scale: 1.1 }} className="w-32">
                  <Image
                    src="/airasia.svg"
                    alt="AirAsia"
                    width={100}
                    height={32}
                    className="grayscale opacity-50 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="w-32">
                  <Image
                    src="/cgv.svg"
                    alt="CGV"
                    width={100}
                    height={32}
                    className="grayscale opacity-50 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="w-32">
                  <Image
                    src="/garuda.svg"
                    alt="Garuda Indonesia"
                    width={100}
                    height={32}
                    className="grayscale opacity-50 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="w-32">
                  <Image
                    src="/imax.svg"
                    alt="IMAX"
                    width={100}
                    height={32}
                    className="grayscale opacity-50 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className={`text-3xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  Explore Our Services
                </h2>
                <p className={`mt-2 ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
                  Discover amazing experiences waiting for you
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {GALLERY_IMAGES.map((image, index) => (
                  <motion.div
                    key={image.url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    className="group relative h-64 rounded-[2rem] overflow-hidden shadow-xl"
                  >
                    <Image
                      src={image.url}
                      alt={image.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-end p-6">
                      <h4 className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {image.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer Section */}
          <footer className="mt-16">
            <div className={`rounded-[2rem] ${theme === "dark" ? "bg-white/5" : "bg-white"} p-8 sm:p-12 border border-gray-100 dark:border-white/10 shadow-xl`}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                {/* Company Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">B</span>
                    </div>
                    <span className={`text-xl font-semibold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      BookItNow
                    </span>
                  </div>
                  <p className={`text-sm ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
                    Your one-stop platform for booking flights, movies, and bus tickets. Experience seamless booking with our modern and user-friendly interface.
                  </p>
                  <div className="flex items-center gap-4">
                    {/* Social Media Links */}
                    {[
                      { icon: "M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z", label: "Twitter" },
                      { icon: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z", label: "Facebook" },
                      { icon: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z", label: "Instagram" },
                      { icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", label: "LinkedIn" }
                    ].map((social, index) => (
                      <motion.a
                        key={social.label}
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-lg ${
                          theme === "dark" 
                            ? "text-white/70 hover:text-white hover:bg-white/10" 
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                        aria-label={social.label}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d={social.icon} />
                        </svg>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Quick Links
                  </h4>
                  <ul className="space-y-3">
                    {["Home", "About Us", "Contact", "Blog"].map((link) => (
                      <motion.li key={link} whileHover={{ x: 5 }}>
                        <Link
                          href="#"
                          className={`text-sm ${
                            theme === "dark" 
                              ? "text-white/50 hover:text-white" 
                              : "text-gray-500 hover:text-gray-900"
                          }`}
                        >
                          {link}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Services
                  </h4>
                  <ul className="space-y-3">
                    {["Flight Booking", "Movie Tickets", "Bus Tickets", "Support"].map((service) => (
                      <motion.li key={service} whileHover={{ x: 5 }}>
                        <Link
                          href="#"
                          className={`text-sm ${
                            theme === "dark" 
                              ? "text-white/50 hover:text-white" 
                              : "text-gray-500 hover:text-gray-900"
                          }`}
                        >
                          {service}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Newsletter */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    Newsletter
                  </h4>
                  <p className={`text-sm mb-4 ${
                    theme === "dark" ? "text-white/50" : "text-gray-500"
                  }`}>
                    Subscribe to our newsletter for the latest updates and exclusive offers.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full px-4 py-2.5 rounded-xl text-sm ${
                        theme === "dark"
                          ? "bg-white/5 text-white border-white/10 focus:border-white/20"
                          : "bg-gray-50 text-gray-900 border-gray-200 focus:border-gray-300"
                      } border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors`}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg transition-all"
                    >
                      Subscribe
                    </motion.button>
                  </form>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className={`mt-12 pt-8 border-t ${
                theme === "dark" ? "border-white/10" : "border-gray-200"
              }`}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className={`text-sm ${
                    theme === "dark" ? "text-white/50" : "text-gray-500"
                  }`}>
                    © 2024 BookItNow. All rights reserved.
                  </p>
                  <div className="flex items-center gap-6">
                    {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                      <Link
                        key={item}
                        href="#"
                        className={`text-sm ${
                          theme === "dark" 
                            ? "text-white/50 hover:text-white" 
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </UserDashboardLayout>
  );
} 