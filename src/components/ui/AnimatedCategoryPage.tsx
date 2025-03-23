'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Link from 'next/link';

interface AnimatedCategoryProps {
  children: ReactNode[];
  category: string;
  featuredCategories: Array<{ name: string; slug: string }>;
}

export default function AnimatedCategoryPage({ 
  children, 
  category,
  featuredCategories 
}: AnimatedCategoryProps) {
  // Make sure children is an array with at least 3 elements
  const childrenArray = Array.isArray(children) ? children : [children];
  const breadcrumbs = childrenArray[0] || null;
  const categoryHeader = childrenArray[1] || null;
  const productsContent = childrenArray[2] || null;

  return (
    <motion.div 
      className="pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        {breadcrumbs} {/* Breadcrumbs */}
        
        {/* Quick Category Navigation */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {featuredCategories.map((cat) => (
              <Link
                href={`/product_category/${cat.slug}`} 
                key={cat.slug}
                className={`relative overflow-hidden group`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    cat.slug === category 
                      ? 'bg-primary-color text-black font-semibold shadow-md' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {cat.name}
                  {cat.slug === category && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-black" 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
        
        {categoryHeader} {/* Category Header */}
        
        {/* Products Grid - Updated for consistent spacing */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {productsContent} {/* Products Content */}
        </motion.div>
      </div>
    </motion.div>
  );
}
