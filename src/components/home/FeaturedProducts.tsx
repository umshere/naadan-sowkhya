'use client';

import { useEffect, useState, useRef } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    <section ref={sectionRef} className="relative py-16 bg-[var(--natural-light)]">
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
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p 
            className="text-center text-[var(--natural-dark)] max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div 
          className="relative pb-12"
          style={{ scale }}
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
                <motion.div 
                  className="px-3 h-full flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1 + 0.3
                  }}
                >
                  <motion.div
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.2 }
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
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        
        {/* Custom navigation styles */}
        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: var(--primary-color) !important;
            background: rgba(255, 255, 255, 0.7);
            width: 40px !important;
            height: 40px !important;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 18px !important;
            font-weight: bold;
          }
          
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: rgba(255, 255, 255, 0.9);
            transform: scale(1.1);
          }
          
          .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: var(--tertiary-color);
            opacity: 0.5;
            transition: all 0.3s ease;
          }
          
          .swiper-pagination-bullet-active {
            opacity: 1;
            background: var(--primary-color) !important;
            transform: scale(1.2);
          }
        `}</style>
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
};

export default FeaturedProducts;
