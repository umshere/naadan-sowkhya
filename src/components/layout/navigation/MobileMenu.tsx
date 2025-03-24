'use client';

import { useState, Fragment, useEffect } from 'react';
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance in pixels to trigger action
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    // Only handle touch events when menu is open and prevent scroll interference
    if (!isMenuOpen) {
      e.stopPropagation();
      return;
    }
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // Only handle touch events when menu is open
    if (!isMenuOpen) {
      e.stopPropagation();
      return;
    }
    
    // Get the touch target element
    const target = e.target as HTMLElement;
    const isScrollableContent = target.closest('.mobile-menu-content');
    
    // Allow vertical scrolling within menu content
    if (isScrollableContent) {
      const touch = e.targetTouches[0];
      const deltaX = touchStart ? touch.clientX - touchStart : 0;
      
      // Only prevent default if trying to scroll horizontally
      if (Math.abs(deltaX) > Math.abs(touch.clientY - (touchStart || 0))) {
        e.preventDefault();
      }
    } else {
      e.preventDefault();
    }
    
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    // Only handle touch events when menu is open
    if (!isMenuOpen) {
      e.stopPropagation();
      return;
    }
    
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    
    // Only close on left swipe
    if (isLeftSwipe) {
      toggleMenu();
    }
    
    // Reset touch positions
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Close dropdown when menu is closed
  useEffect(() => {
    if (!isMenuOpen) {
      setActiveDropdown(null);
      // Re-enable scrolling on the main content when menu is closed
      document.body.classList.remove('mobile-menu-open');
      document.body.classList.add('allow-scroll');
    } else {
      // Disable scrolling on the main content when menu is open
      document.body.classList.add('mobile-menu-open');
      document.body.classList.remove('allow-scroll');
    }
    
    return () => {
      // Cleanup on unmount
      document.body.classList.remove('mobile-menu-open');
      document.body.classList.add('allow-scroll');
    };
  }, [isMenuOpen]);

  return (
    <div
      className={`fixed inset-0 z-[1004] lg:hidden ${
        isMenuOpen ? 'block' : 'hidden'
      }`}
      aria-hidden={!isMenuOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen && !isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={toggleMenu}
      />
      
      {/* Menu Content */}
      <div 
        className={`fixed top-0 right-0 w-[85%] max-w-sm h-[100dvh] bg-white transform transition-transform duration-300 ease-out ${
          isMenuOpen && !isAnimating ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white/95 backdrop-blur-sm z-10 shadow-sm">
            <h1 className="text-xl font-bold text-primary-color">NAADAN SOWKHYA</h1>
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
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

          {/* Scrollable Content */}
          <nav 
            className="mobile-menu-content flex-1 overflow-y-auto overscroll-contain py-4 -webkit-overflow-scrolling-touch" 
            role="navigation"
            style={{
              touchAction: 'pan-y pinch-zoom',
            }}
          >
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
                        aria-expanded={activeDropdown === item.name}
                        aria-controls={`submenu-${item.name}`}
                      >
                        {item.name}
                        <svg 
                          className={`w-4 h-4 transform transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                          fill="none" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-3 text-gray-800 hover:text-primary-color font-medium transition-colors"
                        onClick={() => {
                          toggleMenu();
                          setActiveDropdown(null);
                        }}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                  {item.submenu && activeDropdown === item.name && (
                    <div 
                      id={`submenu-${item.name}`}
                      className="pl-4"
                      role="region"
                      aria-label={`${item.name} submenu`}
                    >
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
                            onClick={() => {
                              toggleMenu();
                              setActiveDropdown(null);
                            }}
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
          
          {/* Contact Info */}
          <div 
            className={`p-4 border-t border-gray-200 transform transition-all duration-300 bg-gray-50 ${
              isMenuOpen && !isAnimating 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-4 opacity-0'
            }`}
            style={{ transitionDelay: `${menuItems.length * 50 + 150}ms` }}
          >
            <p className="text-sm font-medium text-gray-500 mb-3">Contact Us</p>
            <div className="space-y-3">
              <a 
                href="tel:9846981231" 
                className="flex items-center text-primary-color hover:text-primary-color/80 transition-colors"
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
                className="flex items-center text-primary-color hover:text-primary-color/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.019c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.19.014.304-.058.114-.087.185-.173.278l-.086.089c-.086.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.036c.101-.108.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"></path>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
