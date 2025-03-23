'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function AnimatedProductCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="h-full flex" // Setting full height and flex to help child elements stretch
    >
      {children}
    </motion.div>
  );
}
