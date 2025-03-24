'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem } from '@/data/menuItems';

type DesktopMenuProps = {
  menuItems: MenuItem[];
};

export const DesktopMenu = ({ menuItems }: DesktopMenuProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <ul className="hidden lg:flex items-center space-x-12">
      {menuItems.map((item) => (
        <li 
          key={item.name} 
          className="relative group"
          onMouseEnter={() => setActiveDropdown(item.name)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {item.submenu ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 font-medium text-white hover:text-white transition-colors duration-300 py-3 text-lg group"
              >
                <span className="border-b-2 border-transparent group-hover:border-white transition-all duration-300">{item.name}</span>
                <svg 
                  className="w-5 h-5 transform transition-transform duration-200 group-hover:translate-y-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {activeDropdown === item.name && (
                  <motion.div 
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-6 py-3 text-gray-700 hover:text-[var(--primary-color)] hover:bg-gray-50 transition-colors text-base"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href={item.href}
              className="inline-block font-medium text-white hover:text-white transition-colors duration-300 py-3 text-lg relative group"
            >
              <span className="border-b-2 border-transparent group-hover:border-white transition-all duration-300">{item.name}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
