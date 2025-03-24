'use client';

import { useRef } from 'react';
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

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden max-w-[100vw] touch-none"
    >
      {/* Section Header */}
      <div className="container mx-auto px-4 max-w-7xl overflow-hidden">
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block text-sm font-semibold tracking-wider text-[var(--tertiary-color)] uppercase mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our Products
          </motion.span>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-color)] font-serif mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h2>

          <motion.p 
            className="text-lg text-[var(--text-dark)] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          <motion.div 
            className="mx-auto w-24 h-1 bg-[var(--tertiary-color)] mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ scale }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="group w-full"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }
              }}
            >
              <Link href={category.link} className="block w-full">
                <motion.div 
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 
                           transform hover:-translate-y-1 relative overflow-hidden group w-full"
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
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="relative w-16 h-16 mb-4">
                      <OptimizedImage
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 480px) 64px, 64px"
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
                  <p className="text-[var(--text-dark)]/80 text-sm leading-relaxed mb-4">
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
                      initial={{ x: 0 }}
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
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategories;
