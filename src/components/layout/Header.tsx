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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      setIsScrollingUp(currentScrollY < lastScrollY || currentScrollY <= 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transform transition-transform duration-300 
      ${!isScrollingUp && !isMenuOpen ? '-translate-y-full' : 'translate-y-0'}
    `}>
      <div className={`transition-opacity duration-300 ${isScrolled ? 'opacity-0 h-0' : 'opacity-100'}`}>
        <TopBar />
      </div>
      
      <header className={`bg-black bg-opacity-95 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-lg' : 'py-4'
      }`}>
        <div className="container mx-auto px-4 max-w-7xl">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className={`relative flex items-center transition-all duration-300 ${
                isScrolled ? 'scale-[0.85]' : 'scale-100'
              }`}
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
            <div className="hidden lg:flex items-center space-x-12">
              <DesktopMenu menuItems={menuItems} />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -mr-2 rounded-md hover:bg-white/10 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
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
