'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TopBar from './TopBar';
import { DesktopMenu } from './navigation/DesktopMenu';
import { MobileMenu } from './navigation/MobileMenu';
import { menuItems } from '@/data/menuItems';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isMenuOpen) {
      // Store current scroll position
      const currentScroll = window.pageYOffset;
      setScrollPosition(currentScroll);
      
      // Apply fixed position to body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScroll}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';  // Keep scrollbar to prevent layout shift
    } else {
      // Restore scroll position
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, scrollPosition);
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, scrollPosition);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[1001]">
      {/* TopBar */}
      <div className="relative z-[1002]">
        <TopBar />
      </div>
      
      {/* Main Header */}
      <header className="relative z-[1003] bg-black w-full py-4">
        <div className="container mx-auto px-4 max-w-7xl relative">
          <nav className="flex items-center justify-between relative">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative flex items-center transition-all duration-300"
              onClick={() => isMenuOpen && toggleMenu()}
            >
              <Image 
                src="/images/brandname_black.png"
                alt="Naadan Sowkhya"
                width={400}
                height={78}
                className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[280px] h-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <DesktopMenu menuItems={menuItems} />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="block lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors z-[1005]"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-5">
                <span className={`absolute left-0 top-0 w-full h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-2' : ''
                }`} />
                <span className={`absolute left-0 top-2 w-full h-0.5 bg-white transition-all duration-200 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`} />
                <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-white transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-2' : ''
                }`} />
              </div>
            </button>

            {/* Mobile Menu */}
            <MobileMenu 
              isMenuOpen={isMenuOpen} 
              isAnimating={isAnimating} 
              toggleMenu={toggleMenu} 
              menuItems={menuItems}
            />
          </nav>
        </div>
      </header>
    </div>
  );
};
