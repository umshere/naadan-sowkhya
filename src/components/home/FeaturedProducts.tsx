'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
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
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-color mb-2">
              {title}
            </h2>
            
            {subtitle && (
              <p className="text-gray-600 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          
          <Link 
            href="/products" 
            className="hidden md:flex items-center text-primary-color hover:text-primary-dark transition-colors mt-4 md:mt-0 group"
          >
            <span className="mr-2">View all products</span>
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category filters */}
        {categories.length > 2 && (
          <div className="mb-6 overflow-x-auto pb-2 flex gap-2 hide-scrollbar">
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
        )}

        {/* Products Display */}
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

        {/* Mobile View All Button */}
        {showAsCards && (
          <div className="mt-6 flex justify-center md:hidden">
            <Button asChild className="rounded-full">
              <Link href="/products">
                <span className="flex items-center">
                  View all products <FaArrowRight className="ml-2" />
                </span>
              </Link>
            </Button>
          </div>
        )}

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
    </section>
  );
};

export default FeaturedProducts;
