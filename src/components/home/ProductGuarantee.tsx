'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const guarantees = [
  {
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    title: '100% Natural',
    description: 'All our products are made with natural ingredients, free from harmful chemicals'
  },
  {
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
      </svg>
    ),
    title: 'No Preservatives',
    description: 'Our products contain no artificial preservatives or additives'
  },
  {
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
      </svg>
    ),
    title: 'Eco-Friendly',
    description: 'Sustainable packaging and environmentally conscious practices'
  },
  {
    icon: (
      <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
      </svg>
    ),
    title: 'Quality Assured',
    description: 'Every product meets our high standards of quality and effectiveness'
  }
];

const ProductGuarantee = () => {
  const [isVisible, setIsVisible] = useState(false);

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
      }
    );
    const element = document.getElementById('product-guarantee');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="product-guarantee" 
      className="relative py-24 lg:py-32 bg-[var(--natural-light)] overflow-hidden max-w-[100vw] touch-none"
    >
      {/* Natural texture overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl overflow-hidden">
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold text-center text-[var(--primary-color)] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Our Product Guarantee
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 max-w-2xl mx-auto mb-16 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Experience the difference of our natural and pure products, crafted with care and commitment to quality.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2
              }}
            >
              <div className="p-8">
                <motion.div 
                  className="text-[var(--primary-color)] mb-6 flex justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {guarantee.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4 text-[var(--primary-dark)] text-center group-hover:text-[var(--primary-color)] transition-colors">
                  {guarantee.title}
                </h3>
                <p className="text-[var(--text-dark)] leading-relaxed text-center">
                  {guarantee.description}
                </p>
              </div>
              <div className="h-1 w-full bg-[var(--primary-color)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGuarantee;