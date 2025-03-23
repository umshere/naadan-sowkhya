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
      offset: 100,
      disable: false, // Enable AOS for scroll animations
    });
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
}