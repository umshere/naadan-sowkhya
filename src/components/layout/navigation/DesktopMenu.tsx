'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuItem } from '@/data/menuItems';

type DesktopMenuProps = {
  menuItems: MenuItem[];
};

export const DesktopMenu = ({ menuItems }: DesktopMenuProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <ul className="hidden lg:flex items-center space-x-8">
      {menuItems.map((item) => (
        <li 
          key={item.name} 
          className="relative group"
        >
          {item.submenu ? (
            <div className="relative">
              <button
                className="font-medium transition-colors duration-300 text-white hover:text-gray-200 flex items-center py-2"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
              >
                {item.name}
                <svg className="w-4 h-4 ml-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div 
                className={`absolute top-full left-0 mt-0 w-56 bg-white rounded-md shadow-lg py-2 z-50 transform transition-all duration-200 origin-top ${
                  activeDropdown === item.name ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
                }`}
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              href={item.href}
              className="font-medium transition-colors duration-300 text-white hover:text-gray-200 py-2 block"
            >
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
