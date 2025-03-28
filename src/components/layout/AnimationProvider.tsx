'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnimatePresence } from 'framer-motion';

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
      offset: 50, // Reduced from 100 to trigger animations earlier
      delay: 0,
      mirror: true, // Enable animations when scrolling back up
      anchorPlacement: 'top-bottom', // Changed to trigger when top of element reaches bottom of viewport
      disable: false,
    });

    // Add resize event listener to refresh AOS when window is resized
    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener('resize', handleResize);
    
    // Refresh AOS after a slight delay to ensure all elements are properly positioned
    setTimeout(() => {
      AOS.refresh();
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <AnimatePresence>
      {children}
    </AnimatePresence>
  );
}