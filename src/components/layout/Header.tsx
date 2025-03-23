'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TopBar from './TopBar'; // Changed from import { TopBar } to import TopBar
import { DesktopMenu } from './navigation/DesktopMenu';
import { MobileMenu } from './navigation/MobileMenu';
import { menuItems } from '@/data/menuItems';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsAnimating(true);
      // Delay the actual closing to allow for animation
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <TopBar />
      
      {/* Black Navigation Bar */}
      <header className={`bg-black py-4 transition-all duration-300 ${isScrolled ? 'py-3' : ''}`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative flex items-center">
              <h1 className="text-xl font-bold text-white">
                NAADAN SOWKHYA
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <DesktopMenu menuItems={menuItems} />

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
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
