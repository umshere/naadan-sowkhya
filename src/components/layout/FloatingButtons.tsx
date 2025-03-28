'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Common styles
  const buttonStyles = "flex items-center justify-center rounded-full shadow-lg transition-all duration-200";

  return (
    <>
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className={`fixed bottom-24 md:bottom-8 right-4 z-[1000] ${buttonStyles} bg-white text-primary-color shadow-md border border-gray-100 w-12 h-12`}
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingButtons;
