"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  image: string;
  type: "welcome" | "purpose" | "travel" | "entertainment";
  options?: Array<{
    id: string;
    label: string;
    icon: string;
    description: string;
  }>;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: "Welcome to BookItNow",
    description: "Let's get started with a few quick questions to help us personalize your experience.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
    type: "welcome"
  },
  {
    id: 2,
    title: "What are you looking for?",
    description: "Help us understand your needs better.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
    type: "purpose",
    options: [
      { id: "flights", label: "Book Flights", icon: "✈️", description: "Looking to book flights" },
      { id: "buses", label: "Book Buses", icon: "🚌", description: "Interested in bus travel" },
      { id: "movies", label: "Book Movies", icon: "🎬", description: "Want to book movie tickets" }
    ]
  },
  {
    id: 3,
    title: "Travel Preferences",
    description: "Select your preferred travel options.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
    type: "travel",
    options: [
      { id: "domestic", label: "Domestic", icon: "🏠", description: "Travel within the country" },
      { id: "international", label: "International", icon: "🌎", description: "Travel abroad" },
      { id: "business", label: "Business", icon: "💼", description: "Business travel" },
      { id: "leisure", label: "Leisure", icon: "🏖️", description: "Leisure travel" }
    ]
  },
  {
    id: 4,
    title: "Entertainment Preferences",
    description: "What kind of movies do you enjoy?",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    type: "entertainment",
    options: [
      { id: "action", label: "Action", icon: "💥", description: "Action & Adventure" },
      { id: "comedy", label: "Comedy", icon: "😄", description: "Comedy & Fun" },
      { id: "drama", label: "Drama", icon: "🎭", description: "Drama & Emotional" },
      { id: "scifi", label: "Sci-Fi", icon: "🚀", description: "Science Fiction & Fantasy" }
    ]
  }
];

export default function UserOnboardingPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<Record<string, string[]>>({
    purpose: [],
    travel: [],
    entertainment: []
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSelection = (step: number, value: string) => {
    setSelections(prev => {
      const key = ONBOARDING_STEPS[step - 1].type;
      if (key === 'welcome') return prev;
      
      const values = prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: values };
    });
  };

  const handleNext = async () => {
    if (currentStep < ONBOARDING_STEPS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsLoading(true);
      try {
        // Save selections to localStorage
        localStorage.setItem('userPreferences', JSON.stringify(selections));
        
        // Set onboarding completion cookie with a long expiry
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        document.cookie = `onboarding_completed=true; path=/; expires=${expiryDate.toUTCString()}`;
        
        // Use replace instead of push to prevent going back to onboarding
        await router.replace('/dashboard');
      } catch (error) {
        console.error('Error saving preferences:', error);
        setIsLoading(false);
      }
    }
  };

  // Prevent accessing onboarding if already completed
  useEffect(() => {
    const onboardingCompleted = document.cookie.includes('onboarding_completed=true');
    if (onboardingCompleted) {
      router.replace('/dashboard');
    }
  }, [router]);

  const currentStepData = ONBOARDING_STEPS[currentStep - 1];
  const progress = (currentStep / ONBOARDING_STEPS.length) * 100;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex pt-16">
        {/* Left Section - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <AnimatePresence initial={false} custom={currentStep}>
            <motion.div
              key={currentStep}
              custom={currentStep}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              <Image
                src={currentStepData.image}
                alt={currentStepData.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute bottom-16 left-16 max-w-lg">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold text-white mb-4"
                >
                  {currentStepData.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-white/80"
                >
                  {currentStepData.description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="absolute bottom-8 left-8 right-8 z-10">
            <div className="flex items-center gap-4">
              {ONBOARDING_STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index + 1)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentStep === index + 1
                      ? "bg-white w-12"
                      : currentStep > index + 1
                      ? "bg-white/80"
                      : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Content */}
        <div className={`flex-1 p-8 lg:p-12 ${theme === "dark" ? "bg-[#1C1D21]" : "bg-white"}`}>
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <span className="text-white font-semibold text-xl">B</span>
              </div>
              <span className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                BookItNow
              </span>
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Step {currentStep} of {ONBOARDING_STEPS.length}
              </span>
              <span className={`text-sm ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-2 bg-indigo-500 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto"
          >
            <h1 className={`text-3xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {currentStepData.title}
            </h1>
            <p className={`text-lg mb-8 ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
              {currentStepData.description}
            </p>

            {currentStep > 1 && currentStepData.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {currentStepData.options.map(option => {
                  const isSelected = selections[currentStepData.type].includes(option.id);
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleSelection(currentStep, option.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl border-2 transition-all relative ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                          : theme === "dark"
                            ? 'border-white/10 hover:border-white/20'
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <div className={`font-medium mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {option.label}
                      </div>
                      <div className={`text-sm ${theme === "dark" ? "text-white/50" : "text-gray-500"}`}>
                        {option.description}
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className={`px-6 py-2 rounded-lg ${
                    theme === "dark"
                      ? "text-white hover:bg-white/10"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Back
                </button>
              )}
              <motion.button
                onClick={handleNext}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors ml-auto flex items-center gap-2 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : currentStep === ONBOARDING_STEPS.length ? (
                  'Get Started'
                ) : (
                  'Continue'
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 