'use client';

import { useState, Fragment } from 'react';
import Link from 'next/link';
import { MenuItem } from '@/data/menuItems';

type MobileMenuProps = {
  isMenuOpen: boolean;
  isAnimating: boolean;
  toggleMenu: () => void;
  menuItems: MenuItem[];
};

export const MobileMenu = ({ isMenuOpen, isAnimating, toggleMenu, menuItems }: MobileMenuProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        isMenuOpen ? 'block' : 'hidden'
      }`}
      aria-hidden={!isMenuOpen}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isMenuOpen && !isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={toggleMenu}
      ></div>
      
      {/* Menu Content */}
      <div 
        className={`absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isMenuOpen && !isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-primary-color">NAADAN SOWKHYA</h1>
            <button
              className="p-2 rounded-md focus:outline-none transition-transform hover:scale-110"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="px-4 space-y-2">
              {menuItems.map((item, index) => (
                <Fragment key={item.name}>
                  <li 
                    className={`transform transition-all duration-300 ${
                      isMenuOpen && !isAnimating 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-8 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 50 + 100}ms` }}
                  >
                    {item.submenu ? (
                      <button
                        className="w-full text-left py-3 text-gray-800 hover:text-primary-color font-medium transition-colors flex items-center justify-between"
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      >
                        {item.name}
                        <svg className={`w-4 h-4 transform transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-3 text-gray-800 hover:text-primary-color font-medium transition-colors"
                        onClick={toggleMenu}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                  {item.submenu && activeDropdown === item.name && (
                    <div className="pl-4">
                      {item.submenu.map((subItem, subIndex) => (
                        <li
                          key={subItem.name}
                          className={`transform transition-all duration-300 ${
                            isMenuOpen && !isAnimating 
                              ? 'translate-x-0 opacity-100' 
                              : 'translate-x-8 opacity-0'
                          }`}
                          style={{ transitionDelay: `${(index * 50) + (subIndex * 30) + 150}ms` }}
                        >
                          <Link
                            href={subItem.href}
                            className="block py-2 text-gray-600 hover:text-primary-color transition-colors"
                            onClick={toggleMenu}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </div>
                  )}
                </Fragment>
              ))}
            </ul>
          </nav>
          
          {/* Contact Info in Mobile Menu */}
          <div 
            className={`p-4 border-t border-gray-200 transform transition-all duration-300 ${
              isMenuOpen && !isAnimating 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${menuItems.length * 50 + 150}ms` }}
          >
            <p className="text-sm text-gray-500 mb-2">Contact Us</p>
            <a 
              href="tel:9846981231" 
              className="flex items-center text-primary-color mb-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 9846981231
            </a>
            <a 
              href="https://wa.me/919846981231" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary-color"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
