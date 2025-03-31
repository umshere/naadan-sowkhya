'use client';

import { useState, useEffect, useRef } from 'react'; // Added useRef
import Link from 'next/link';
import Image from 'next/image';
import TopBar from './TopBar';
import { DesktopMenu } from './navigation/DesktopMenu';
import { MobileMenu } from './navigation/MobileMenu';
import { menuItems } from '@/data/menuItems';
import { cn } from '@/lib/utils'; // Import cn

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true); // Renamed state
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null); // Ref for the main wrapper

  // Mobile menu scroll lock logic (remains the same)
  useEffect(() => {
    if (isMenuOpen) {
      const currentScroll = window.pageYOffset;
      setScrollPosition(currentScroll);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScroll}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
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
      // No scrollTo on unmount to avoid jump on page leave
    };
  }, [isMenuOpen]);

  // Control visibility based on scroll direction (moved from TopBar)
  const controlHeaderVisibility = () => {
    const isMobile = window.innerWidth < 768; // Tailwind's 'md' breakpoint

    if (typeof window !== 'undefined' && isMobile) {
      if (window.scrollY > lastScrollY && window.scrollY > 50) { // If scrolling down & past a threshold
        setIsTopBarVisible(false);
      } else { // If scrolling up
        setIsTopBarVisible(true);
      }
      setLastScrollY(window.scrollY);
    } else {
      setIsTopBarVisible(true); // Always visible on larger screens
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeaderVisibility);
      return () => {
        window.removeEventListener('scroll', controlHeaderVisibility);
      };
    }
  }, [lastScrollY]); // Re-run effect when lastScrollY changes

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
    // Apply fixed positioning, z-index, transition and conditional translate here
    <div
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50", // Use a high z-index (e.g., z-50)
        "transition-transform duration-300 ease-in-out",
        !isTopBarVisible && "md:transform-none -translate-y-full" // Hide when not visible on mobile
      )}
    >
      {/* TopBar - No longer needs its own sticky/z-index */}
      <TopBar />

      {/* Main Header - No longer needs relative positioning */}
      <header className="bg-black w-full py-4 shadow-md"> {/* Added shadow */}
        <div className="container mx-auto px-4 max-w-7xl">
          <nav className="flex items-center justify-between">
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
              className="block lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors z-[1005]" // Keep high z-index for button
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

            {/* Mobile Menu - Ensure it has high enough z-index */}
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
