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
    <ul className="hidden lg:flex items-center space-x-10">
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
                className="flex items-center space-x-1.5 font-medium text-white hover:text-gray-200 transition-colors duration-300 py-2 group"
              >
                <span>{item.name}</span>
                <svg 
                  className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-y-0.5" 
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
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 z-50"
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
                          className="block px-4 py-2.5 text-gray-700 hover:text-[var(--primary-color)] hover:bg-gray-50 transition-colors text-sm"
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
              className="inline-block font-medium text-white hover:text-gray-200 transition-colors duration-300 py-2 relative group"
            >
              {item.name}
              <span className="absolute bottom-1.5 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
