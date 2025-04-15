"use client";

import React, { useState } from 'react';
import type { JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

type NavigationItem = {
  name: string;
  href: string;
  icon: JSX.Element;
  adminOnly?: boolean;
};

export default function DashboardNavigation() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigation: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      ),
    },
    {
      name: 'Bookings',
      href: '/bookings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: 'Transport Management',
      href: '/admin/transports',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path d="M3 9l2.45-4.9A2 2 0 017.24 3h9.52a2 2 0 011.8 1.1L21 9" />
          <path d="M8 13h.01" />
          <path d="M16 13h.01" />
        </svg>
      ),
      adminOnly: true,
    },
    {
      name: 'Explore',
      href: '/explore',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter(item => 
    !item.adminOnly || (user?.user_role === 'admin')
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-full ${
            theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={theme === 'dark' ? 'text-white' : 'text-gray-900'}
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`fixed inset-0 z-40 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <motion.div
          className={`fixed inset-y-0 right-0 w-64 px-6 py-4 ${
            theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          } shadow-xl`}
          initial={{ x: '100%' }}
          animate={{ x: isOpen ? 0 : '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  BookItNow
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={theme === 'dark' ? 'text-white' : 'text-gray-900'}
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="space-y-1 flex-1">
              {filteredNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-white/10 text-white'
                          : 'bg-indigo-50 text-indigo-600'
                        : theme === 'dark'
                          ? 'text-white/70 hover:bg-white/5 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto pt-4">
              <div
                className={`p-4 rounded-xl ${
                  theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Need help?
                </p>
                <p
                  className={`text-xs mt-1 ${
                    theme === 'dark' ? 'text-white/50' : 'text-gray-500'
                  }`}
                >
                  Contact our support team
                </p>
                <button
                  className="mt-3 w-full px-3 py-2 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Get Support
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Desktop navigation */}
      <div
        className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 ${
          theme === 'dark' ? 'bg-gray-900/50 border-white/10' : 'bg-white border-gray-200'
        } border-r backdrop-blur-xl`}
      >
        <div className="flex flex-col h-full px-4 py-6">
          <div className="flex items-center space-x-3 px-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              BookItNow
            </span>
          </div>
          <nav className="flex-1 space-y-2 px-2">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors relative ${
                    isActive
                      ? theme === 'dark'
                        ? 'bg-white/10 text-white'
                        : 'bg-indigo-50 text-indigo-600'
                      : theme === 'dark'
                        ? 'text-white/70 hover:bg-white/5 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className={`absolute inset-0 rounded-xl ${
                        theme === 'dark' ? 'bg-white/10' : 'bg-indigo-50'
                      }`}
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative mr-3">{item.icon}</span>
                  <span className="relative">{item.name}</span>
                  {isActive && theme !== 'dark' && (
                    <motion.div
                      layoutId="activeBorder"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 rounded-full"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto pt-4 px-2">
            <div
              className={`p-4 rounded-xl ${
                theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Need help?
              </p>
              <p
                className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-white/50' : 'text-gray-500'
                }`}
              >
                Contact our support team
              </p>
              <button
                className="mt-3 w-full px-3 py-2 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Get Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 