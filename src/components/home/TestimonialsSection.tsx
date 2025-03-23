'use client';

import { useRef } from 'react';
import TestimonialCarousel from '@/components/ui/TestimonialCarousel';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  text: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const waveOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.3]);

  // Wave animation variants
  const waveVariants = {
    animate: {
      x: [0, -1200],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-[var(--natural-light)]"
      id="testimonials-section"
    >
      {/* Top decorative wave */}
      <motion.div 
        className="absolute left-0 w-full overflow-hidden h-16 -top-1 z-10"
        style={{ opacity: waveOpacity }}
      >
        <motion.svg 
          viewBox="0 0 2400 120" 
          preserveAspectRatio="none" 
          className="w-full h-full"
          variants={waveVariants}
          animate="animate"
        >
          <motion.path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H2400V95.8C2332.19,118.92,2255.71,111.31,2185.66,92.83Z"
            fill="var(--primary-color)"
            opacity="0.2"
          />
        </motion.svg>
      </motion.div>

      <motion.div 
        className="container mx-auto px-4 relative z-20"
        style={{ y, opacity }}
      >
        <motion.h2
          className="section-title text-center text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Customer Reviews
        </motion.h2>

        <motion.div
          className="mx-auto max-w-3xl relative mt-10"
          style={{ scale }}
        >
          <TestimonialCarousel testimonials={testimonials} compact />
          
          {/* Link to all testimonials */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.a
              href="/testimonials"
              className="inline-flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="text-lg font-semibold"
                whileHover={{ x: -3 }}
              >
                View All Reviews
              </motion.span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ x: 3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom decorative wave */}
      <motion.div 
        className="absolute left-0 w-full overflow-hidden h-16 -bottom-1 z-10 transform rotate-180"
        style={{ opacity: waveOpacity }}
      >
        <motion.svg 
          viewBox="0 0 2400 120" 
          preserveAspectRatio="none" 
          className="w-full h-full"
          variants={waveVariants}
          animate="animate"
        >
          <motion.path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H2400V95.8C2332.19,118.92,2255.71,111.31,2185.66,92.83Z"
            fill="var(--primary-color)"
            opacity="0.2"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
