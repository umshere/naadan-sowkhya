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
    <section
      ref={sectionRef}
      className="py-16 md:py-24 lg:py-32 bg-[var(--natural-light)] relative overflow-hidden section-scroll"
      style={{ touchAction: 'pan-y pinch-zoom' }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 section-content">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-center text-[var(--primary-color)] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: isMobile ? 0.4 : 0.6 }}
        >
          What Our Customers Say
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Read authentic testimonials from our valued customers who have experienced the quality of our natural products.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: isMobile ? 0.1 : 0.2,
                delayChildren: 0.3
              }
            }
          }}
        >
          {testimonials.slice(0, isMobile ? 3 : 6).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="h-full"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: isMobile ? 0.3 : 0.5,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <TestimonialCarousel 
                testimonials={[testimonial]} 
                compact={isMobile}
              />
            </motion.div>
          ))}
        </motion.div>

        {testimonials.length > (isMobile ? 3 : 6) && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Link
              href="/testimonials"
              className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg 
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
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
