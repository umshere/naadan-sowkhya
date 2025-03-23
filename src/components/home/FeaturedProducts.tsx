'use client';

import { useEffect, useState, useRef } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: string;
  currency: string;
  description: string;
  whatsappLink: string;
}

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  productIds: string[];
  allProducts: Product[];
}

const FeaturedProducts = ({ title, subtitle, productIds, allProducts }: FeaturedProductsProps) => {
  const [visibleProducts, setVisibleProducts] = useState<number>(4);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Filter products based on the featured product IDs
  const featuredProducts = allProducts.filter(product => productIds.includes(product.id));

  // Determine how many products to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleProducts(1);
      } else if (window.innerWidth < 768) {
        setVisibleProducts(2);
      } else if (window.innerWidth < 1024) {
        setVisibleProducts(3);
      } else {
        setVisibleProducts(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for animations
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 bg-[var(--natural-light)]">
      {/* Decorative elements */}
      <div className="absolute left-0 w-full overflow-hidden h-16 -top-1 z-10 opacity-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            fill="var(--primary-color)"
            opacity="0.2"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <h2 
          className={`section-title transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p 
            className={`text-center text-[var(--natural-dark)] max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {subtitle}
          </p>
        )}

        <div 
          className={`relative transition-all duration-1000 delay-400 pb-12 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={visibleProducts}
            navigation
            pagination={{ 
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active bg-primary-color',
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="product-carousel !pb-12"
          >
            {featuredProducts.map((product, index) => (
              <SwiperSlide key={product.id} className="h-full">
                <div 
                  className="px-3 h-full flex flex-col"
                  style={{ 
                    transitionDelay: `${(index + 3) * 100}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
                  }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    image={product.image}
                    price={product.price}
                    currency={product.currency}
                    whatsappLink={product.whatsappLink}
                    category={product.category}
                    className="flex-1"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* Custom navigation styles - add after the Swiper component */}
        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: var(--primary-color) !important;
            background: rgba(255, 255, 255, 0.7);
            width: 40px !important;
            height: 40px !important;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }
          
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 18px !important;
            font-weight: bold;
          }
          
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: rgba(255, 255, 255, 0.9);
          }
          
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: var(--tertiary-color);
            opacity: 0.5;
          }
          
          .swiper-pagination-bullet-active {
            opacity: 1;
            background: var(--primary-color) !important;
            transform: scale(1.2);
          }
        `}</style>
      </div>
      
      {/* Bottom decorative wave */}
      <div className="absolute left-0 w-full overflow-hidden h-16 -bottom-1 z-10 opacity-30 transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path 
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
            fill="var(--primary-color)"
            opacity="0.2"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default FeaturedProducts;
