'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';

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
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('product-categories');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="product-categories" 
      className="relative py-16 md:py-24 leaf-bg-pattern"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-10 organic-texture"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-sm font-semibold tracking-wider text-[var(--tertiary-color)] uppercase">Our Products</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] font-serif mt-2 mb-3">
            {title}
          </h2>
          <p className="mt-2 text-base text-[var(--text-dark)] max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="mx-auto w-20 h-1 bg-[var(--tertiary-color)] mt-4"></div>
        </div>

        {/* Categories Grid - Improved responsive layout */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              href={category.link}
              className="group h-full"
              style={{ 
                transitionDelay: `${(index % 3) * 100 + 200}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
              }}
            >
              {/* Standardized Card Design */}
              <div 
                className="flex flex-col items-center h-full bg-white rounded-lg shadow-sm
                         border border-[var(--tertiary-color)]/10 p-8 text-center
                         transition-all duration-300 ease-out
                         hover:shadow-md hover:translate-y-[-4px] hover:border-[var(--tertiary-color)]/30"
              >
                {/* Fixed-size image container */}
                <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[var(--primary-light)] opacity-10 
                               transition-transform duration-300 group-hover:scale-110"></div>
                  <div className="relative w-20 h-20 transition-transform duration-300 group-hover:scale-110">
                    <OptimizedImage
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                </div>
                
                {/* Title with uniform styling */}
                <h3 className="text-xl font-serif font-semibold text-[var(--primary-color)] mb-3
                             transition-colors duration-300 group-hover:text-[var(--secondary-color)]">
                  {category.name}
                </h3>
                
                {/* Animated underline */}
                <div className="relative h-0.5 w-12 mx-auto mt-1 mb-3 overflow-hidden">
                  <span 
                    className="absolute inset-0 bg-[var(--tertiary-color)] transform scale-x-0 group-hover:scale-x-100
                             transition-transform duration-300 origin-left"
                  ></span>
                </div>
                
                {/* Optional short description - could be added from data if needed */}
                <p className="text-sm text-[var(--text-dark)]/70 leading-relaxed">
                  {category.description}
                </p>
                
                {/* View indicator */}
                <div className="mt-5 flex items-center text-[var(--tertiary-color)] text-sm font-medium">
                  <span className="mr-1">View products</span>
                  <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
                       fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
