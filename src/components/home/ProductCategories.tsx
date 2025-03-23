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
      className="relative py-10 md:py-16 leaf-bg-pattern" // Reduced vertical padding
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-10 organic-texture"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header - More compact */}
        <div 
          className={`text-center mb-8 md:mb-10 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-xs font-semibold tracking-wider text-[var(--tertiary-color)] uppercase">Our Products</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] font-serif mt-1 mb-2">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[var(--text-dark)] max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="mx-auto w-16 h-0.5 bg-[var(--tertiary-color)] mt-3"></div>
        </div>

        {/* Categories Grid - Improved responsive layout with more columns */}
        <div 
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              href={category.link}
              className="group h-full"
              style={{ 
                transitionDelay: `${(index % 4) * 75 + 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
              }}
            >
              {/* More compact card design */}
              <div 
                className="flex flex-col items-center h-full bg-white rounded-lg shadow-sm
                         border border-[var(--tertiary-color)]/10 p-4 md:p-5 text-center
                         transition-all duration-300 ease-out
                         hover:shadow-md hover:translate-y-[-2px] hover:border-[var(--tertiary-color)]/30"
              >
                {/* Smaller image container */}
                <div className="w-16 h-16 mb-3 relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[var(--primary-light)] opacity-10 
                               transition-transform duration-300 group-hover:scale-110"></div>
                  <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110">
                    <OptimizedImage
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain"
                      sizes="56px"
                    />
                  </div>
                </div>
                
                {/* More compact title styling */}
                <h3 className="text-base font-serif font-semibold text-[var(--primary-color)] mb-1
                             transition-colors duration-300 group-hover:text-[var(--secondary-color)]">
                  {category.name}
                </h3>
                
                {/* Animated underline */}
                <div className="relative h-0.5 w-10 mx-auto mt-1 mb-2 overflow-hidden">
                  <span 
                    className="absolute inset-0 bg-[var(--tertiary-color)] transform scale-x-0 group-hover:scale-x-100
                             transition-transform duration-300 origin-left"
                  ></span>
                </div>
                
                {/* Shorter description with ellipsis for overflow */}
                <p className="text-xs text-[var(--text-dark)]/70 leading-relaxed line-clamp-2">
                  {category.description}
                </p>
                
                {/* Compact view indicator */}
                <div className="mt-3 flex items-center text-[var(--tertiary-color)] text-xs font-medium">
                  <span className="mr-1">View</span>
                  <svg className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1" 
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
