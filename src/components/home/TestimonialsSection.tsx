'use client';

import { useRef, useState, useEffect } from 'react';
import TestimonialCarousel from '@/components/ui/TestimonialCarousel';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface Testimonial {
  id: number;
  name: string;
  text: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6 
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px' // Earlier trigger on mobile
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-[var(--natural-light)] overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      style={{ touchAction: 'pan-y pinch-zoom' }}
    >
      {/* Subtle background texture with parallax effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-5"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Consistent Section Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.span
            className="inline-block text-sm font-medium tracking-wider text-[var(--tertiary-color)] uppercase mb-2"
            variants={itemVariants}
          >
            Customer Experiences
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-[var(--primary-color)] mb-3"
            variants={itemVariants}
          >
            What Our Customers Say
          </motion.h2>
          <div className="flex justify-center">
            <div className="h-1 w-16 bg-[var(--primary-color)] rounded-full mb-4 opacity-80"></div>
          </div>
          <motion.p
            className="text-center text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            variants={itemVariants}
          >
            Read authentic testimonials from our valued customers who have experienced the quality of our natural products
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <TestimonialCarousel 
            testimonials={testimonials}
            compact={isMobile}
          />
        </motion.div>

        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
        >
          <Link
            href="/testimonials"
            className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] text-white rounded-full 
                     hover:bg-opacity-90 transition-all duration-300 touch-target"
          >
            <span className="mr-2">View All Testimonials</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
