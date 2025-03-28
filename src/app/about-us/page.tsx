'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AboutTabs from '@/components/about/AboutTabs';

// Import data
import aboutData from '@/data/about.json';

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="pt-16 pb-16" ref={pageRef}>
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Breadcrumbs */}
        <motion.div 
          className="mb-8 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Link href="/" className="text-gray-500 hover:text-primary-color">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-primary-color">About Us</span>
        </motion.div>
        
        {/* Page Header */}
        <motion.div 
          className="text-center mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-primary-color mb-4"
            variants={itemVariants}
          >
            About Us
          </motion.h1>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Learn more about NAADAN SOWKHYA, our mission, vision, and the people behind our natural products.
          </motion.p>
        </motion.div>
        
        {/* Mobile: TabView experience */}
        <AboutTabs />
        
        {/* Desktop CTA - hidden on mobile since it's in the tabs */}
        <motion.div 
          className="hidden md:block bg-primary-color text-white p-8 rounded-lg text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Join us in embracing a lifestyle that celebrates the harmony between humanity and nature
          </motion.h2>
          <motion.p 
            className="mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Together, let's make a positive impact. Welcome to NAADAN SOWKHYA.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link 
              href="/product_category/natural-hair-care" 
              className="btn bg-white text-primary-color hover:bg-gray-100 inline-block px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Explore Our Products
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}