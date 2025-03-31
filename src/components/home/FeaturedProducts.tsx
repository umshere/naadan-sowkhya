'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ui/ProductCard';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';

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
  showAsCards?: boolean;
}

const FeaturedProducts = ({ 
  title, 
  subtitle, 
  productIds, 
  allProducts, 
  showAsCards = false 
}: FeaturedProductsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6 
      }
    }
  };
  
  // Filter products based on the featured product IDs
  const featuredProducts = allProducts.filter(product => 
    Array.isArray(productIds) && productIds.includes(product.id)
  );
  
  // Get unique categories for filter tabs
  const categories = ['all', ...Array.from(new Set(
    featuredProducts
      .map(product => product.category?.split(' '))
      .flat()
      .filter(Boolean)
  ))];
  
  // Filter products by active category
  const filteredProducts = activeCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => 
        product.category?.split(' ').includes(activeCategory)
      );

  return (
    <motion.section 
      className="relative py-16 md:py-24 bg-[var(--natural-light)] overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Subtle background texture with parallax effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-5"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Consistent Section Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.span
            className="inline-block text-sm font-medium tracking-wider text-[var(--tertiary-color)] uppercase mb-2"
            variants={itemVariants}
          >
            Our Collection
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-[var(--primary-color)] mb-3"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          <div className="flex justify-center">
            <div className="h-1 w-16 bg-[var(--primary-color)] rounded-full mb-4 opacity-80"></div>
          </div>
          {subtitle && (
            <motion.p
              className="text-center text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Category filters - Centered for consistency */}
        {categories.length > 2 && (
          <motion.div 
            className="flex justify-center mb-8 overflow-x-auto pb-2 hide-scrollbar"
            variants={itemVariants}
          >
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap rounded-full"
                >
                  {category === 'all' ? 'All Products' : category.replace(/-/g, ' ')}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Products Display */}
        <motion.div variants={itemVariants}>
          {showAsCards ? (
            // Card grid for mobile view
            <div className="grid grid-cols-2 gap-4 pb-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="h-full overflow-hidden border border-gray-200">
                  <CardContent className="p-0">
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      slug={product.slug}
                      image={product.image}
                      price={product.price}
                      currency={product.currency}
                      whatsappLink={product.whatsappLink}
                      category={product.category}
                      className="h-full"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Carousel for desktop view
            <Carousel className="w-full">
              <CarouselContent className="-ml-4 md:ml-0">
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <Card className="h-full border border-gray-200 hover:border-primary-color/30 transition-colors">
                      <CardContent className="p-0">
                        <ProductCard
                          id={product.id}
                          name={product.name}
                          slug={product.slug}
                          image={product.image}
                          price={product.price}
                          currency={product.currency}
                          whatsappLink={product.whatsappLink}
                          category={product.category}
                          className="h-full"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-0 -translate-x-1/2" />
                <CarouselNext className="right-0 translate-x-1/2" />
              </div>
            </Carousel>
          )}
        </motion.div>

        {/* View All Products Button - Centered for mobile and desktop consistency */}
        <motion.div 
          className="mt-10 flex justify-center" 
          variants={itemVariants}
        >
          <Button 
            asChild 
            className="rounded-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 group"
          >
            <Link href="/products">
              <span className="flex items-center">
                View all products 
                <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>
        </motion.div>

        {/* Custom styles for hiding scrollbar */}
        <style jsx global>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </motion.section>
  );
};

export default FeaturedProducts;
