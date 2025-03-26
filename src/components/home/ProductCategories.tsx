'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CategoryProps {
  name: string;
  description: string;
  image: string;
  link: string;
}

interface ProductCategoriesData {
  title: string;
  subtitle: string;
  categories: CategoryProps[];
}

interface ProductCategoriesProps {
  data: ProductCategoriesData;
}

const ProductCategories = ({ data }: ProductCategoriesProps) => {
  const { title, subtitle, categories } = data;
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [isScrolling, setIsScrolling] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2], [isMobile ? 0.98 : 0.95, 1]);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current.time) return;

    const deltaX = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartRef.current.y);

    // If horizontal scrolling is detected, mark as scrolling to prevent card interactions
    if (deltaX > deltaY && deltaX > 10) {
      setIsScrolling(true);
    }
  };

  const handleTouchEnd = () => {
    const touchDuration = Date.now() - touchStartRef.current.time;
    // Reset scroll state after a short delay
    if (touchDuration < 300) {
      setTimeout(() => setIsScrolling(false), 50);
    } else {
      setIsScrolling(false);
    }
    touchStartRef.current = { x: 0, y: 0, time: 0 };
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 md:py-24 lg:py-32 bg-white overflow-hidden max-w-[100vw] section-scroll"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Section Header */}
      <div className="container mx-auto px-4 max-w-7xl overflow-hidden section-content">
        <motion.div 
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0.3 : 0.6 }}
        >
          <motion.span 
            className="inline-block text-sm font-semibold tracking-wider text-[var(--tertiary-color)] uppercase mb-1 md:mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: isMobile ? 0.1 : 0.2 }}
          >
            Our Products
          </motion.span>

          <motion.h2 
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-color)] font-serif mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: isMobile ? 0.2 : 0.3 }}
          >
            {title}
          </motion.h2>

          <motion.p 
            className="text-base md:text-lg text-[var(--text-dark)] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: isMobile ? 0.2 : 0.4 }}
          >
            {subtitle}
          </motion.p>

          <motion.div 
            className="mx-auto w-16 md:w-24 h-1 bg-[var(--tertiary-color)] mt-4 md:mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: isMobile ? 0.3 : 0.5, duration: isMobile ? 0.3 : 0.6 }}
          />
        </motion.div>

        <motion.div 
          className="container mx-auto px-4 max-w-7xl overflow-x-auto overflow-y-hidden section-content touch-pan-x"
          style={{ 
            scale,
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12 w-full"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="group w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: isMobile ? index * 0.1 : index * 0.2, 
                  duration: isMobile ? 0.3 : 0.5 
                }}
              >
                <Link 
                  href={category.link} 
                  className={`block w-full ${isScrolling ? 'pointer-events-none' : ''}`}
                  onClick={(e) => isScrolling && e.preventDefault()}
                >
                  <motion.div 
                    className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 
                             transform hover:-translate-y-1 relative overflow-hidden group w-full mobile-optimized"
                    style={{ touchAction: 'pan-y pinch-zoom' }}
                  >
                    {/* Icon Background */}
                    <motion.div 
                      className="absolute inset-0 bg-[var(--primary-light)] opacity-0 group-hover:opacity-10 
                               transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                    />
                    
                    {/* Category Icon & Name */}
                    <motion.div 
                      className="flex flex-col items-center text-center mb-4"
                    >
                      <div className="relative w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4">
                        <OptimizedImage
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-contain"
                          sizes="(max-width: 480px) 48px, 64px"
                        />
                      </div>
                      
                      <motion.h3 
                        className="text-xl font-serif font-semibold text-[var(--primary-color)] mb-2 
                                 group-hover:text-[var(--secondary-color)] transition-colors"
                      >
                        {category.name}
                      </motion.h3>
                    </motion.div>
                    
                    {/* Category Description */}
                    <p className="text-[var(--text-dark)]/80 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                      {category.description}
                    </p>
                    
                    {/* View More Link */}
                    <motion.div 
                      className="flex items-center justify-center text-[var(--tertiary-color)] text-sm font-medium group"
                      whileHover={{ x: 4 }}
                    >
                      <span className="mr-2 group-hover:underline">View Products</span>
                      <motion.svg 
                        className="w-4 h-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        initial={{ x: isMobile ? 3 : 0 }}
                        animate={{ x: 3 }}
                        transition={{
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 1
                        }}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </motion.svg>
                    </motion.div>

                    {/* Decorative Border */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-[var(--primary-color)]"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Enhanced touch feedback overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/5 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileTap={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategories;
