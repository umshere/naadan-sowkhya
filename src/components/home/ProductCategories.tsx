'use client';

import { useRef } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CategoryProps {
  id: string;
  name: string;
  image: string;
  link: string;
  description: string;
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="product-categories" 
      className="relative py-10 md:py-16 leaf-bg-pattern"
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-10 organic-texture"
        style={{ opacity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="text-xs font-semibold tracking-wider text-[var(--tertiary-color)] uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our Products
          </motion.span>

          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] font-serif mt-1 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h2>

          <motion.p 
            className="mt-1 text-sm text-[var(--text-dark)] max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          <motion.div 
            className="mx-auto w-16 h-0.5 bg-[var(--tertiary-color)] mt-3"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 md:gap-5 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ scale }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              custom={index}
            >
              <Link 
                href={category.link}
                className="group block h-full"
              >
                <motion.div 
                  className="flex flex-col items-center h-full bg-white rounded-lg shadow-sm
                           border border-[var(--tertiary-color)]/10 p-3 xs:p-4 md:p-5 text-center
                           transition-all duration-300 ease-out"
                  whileHover={{ 
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="w-12 h-12 xs:w-14 xs:h-14 md:w-16 md:h-16 mb-2 xs:mb-3 relative flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-[var(--primary-light)] opacity-10"
                      whileHover={{ scale: 1.2 }}
                    />
                    
                    <div className="relative w-10 h-10 xs:w-12 xs:h-12 md:w-14 md:h-14">
                      <OptimizedImage
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 480px) 40px, (max-width: 768px) 48px, 56px"
                      />
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-sm xs:text-base font-serif font-semibold text-[var(--primary-color)] mb-1"
                    whileHover={{ color: 'var(--secondary-color)' }}
                  >
                    {category.name}
                  </motion.h3>
                  
                  <motion.div 
                    className="relative h-0.5 w-8 xs:w-10 mx-auto mt-1 mb-1 xs:mb-2 overflow-hidden"
                    whileHover={{ scale: 1.2 }}
                  >
                    <motion.span 
                      className="absolute inset-0 bg-[var(--tertiary-color)]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <p className="text-xs text-[var(--text-dark)]/70 leading-relaxed line-clamp-2 hidden xs:block">
                    {category.description}
                  </p>
                  
                  <motion.div 
                    className="mt-2 xs:mt-3 flex items-center text-[var(--tertiary-color)] text-xs font-medium"
                    whileHover={{ x: 4 }}
                  >
                    <span className="mr-1">View</span>
                    <motion.svg 
                      className="w-3 h-3" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      whileHover={{ x: 3 }}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </motion.svg>
                  </motion.div>
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
