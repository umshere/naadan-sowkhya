'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Zoom } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  FaWhatsapp, 
  FaLeaf, 
  FaShare, 
  FaArrowLeft, 
  FaChevronDown, 
  FaChevronUp,
  FaHeart,
  FaHeartBroken
} from 'react-icons/fa';
import productsData from '@/data/products.json';
import ProductCardCompact from '@/components/product/ProductCardCompact';
import { cn } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/zoom';

interface ProductDetailsProps {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  benefits?: string;
  ingredients?: string;
  image: string;
  gallery?: string[];
  price: string;
  currency: string;
  whatsappLink: string;
}

export default function ProductDetailsEnhanced({
  id,
  name,
  slug,
  category,
  description,
  benefits,
  ingredients,
  image,
  gallery,
  price,
  currency,
  whatsappLink,
}: ProductDetailsProps) {
  const [activeTab, setActiveTab] = useState('description');
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  
  const productHeaderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerScrollThreshold = 80;
  
  // Detect if on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Scroll event for mobile sticky header
  useEffect(() => {
    if (!isMobile) return;
    
    const handleScroll = () => {
      if (contentRef.current) {
        setIsScrolled(contentRef.current.scrollTop > headerScrollThreshold);
      }
    };
    
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Format image paths
  const getImagePath = (imagePath: string): string => {
    if (imagePath?.startsWith('http')) {
      return imagePath;
    }
    
    if (imagePath?.includes('/images/')) {
      return imagePath;
    }
    
    if (imagePath && !imagePath.startsWith('/')) {
      return `/images/products/${imagePath}`;
    }
    
    return imagePath || '/images/placeholder.jpg';
  };
  
  // Handle gallery images
  const processedMainImage = getImagePath(image);
  const processedGallery = gallery 
    ? gallery.map(img => getImagePath(img))
    : [processedMainImage];
  
  if (!processedGallery.includes(processedMainImage)) {
    processedGallery.unshift(processedMainImage);
  }
  
  // Fallback image if main image fails to load
  const fallbackImage = "/images/placeholder.jpg";
  
  // Format price
  const formatPrice = (price: string | number): string => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    
    const numPrice = parseFloat(price);
    if (!isNaN(numPrice)) {
      return numPrice.toFixed(2);
    }
    
    return price.toString();
  };
  
  // Find similar products
  const similarProducts = productsData.products
    .filter(p => p.category === category && p.id !== id)
    .slice(0, 6);
    
  // Get categories for quick links
  const categories = Array.from(
    new Set(productsData.products.map(p => p.category))
  ).slice(0, 6);

  // Handle share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: `Check out ${name} from Naadan Sowkhya!`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
        setIsShareMenuOpen(!isShareMenuOpen);
      }
    } else {
      setIsShareMenuOpen(!isShareMenuOpen);
    }
  };

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would save this to localStorage or your favorites database
  };
  
  return (
    <div className="bg-gray-50">
      <div className={cn(
        "fixed top-0 left-0 right-0 z-30 bg-white transition-all duration-300 md:hidden",
        isScrolled ? "shadow-md" : "shadow-none",
        isScrolled ? "h-16" : "h-0 opacity-0"
      )}>
        <div className="flex items-center justify-between px-4 h-full">
          <Link href="/our_products" className="flex items-center">
            <FaArrowLeft className="mr-2" />
            <span className="font-medium">Products</span>
          </Link>
          <h1 className={cn(
            "text-lg font-semibold transition-all duration-300",
            isScrolled ? "opacity-100" : "opacity-0"
          )}>
            {name}
          </h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleFavorite}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              {isFavorite ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaHeartBroken className="text-gray-400" />
              )}
            </button>
            <button 
              onClick={handleShare}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
            >
              <FaShare className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="h-screen overflow-y-auto md:overflow-visible md:h-auto">
        {/* Mobile header with back button */}
        <div className={cn(
          "sticky top-0 left-0 right-0 z-20 bg-transparent md:hidden",
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <div className="absolute top-4 left-4 z-10">
            <Link
              href="/our_products"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <FaArrowLeft className="text-gray-700" />
            </Link>
          </div>
          <div className="absolute top-4 right-4 z-10 flex space-x-2">
            <button
              onClick={toggleFavorite}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              {isFavorite ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaHeartBroken className="text-gray-400" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <FaShare className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Product Image Gallery with Swiper for mobile */}
        <div className="md:pt-8 md:container md:mx-auto md:px-4">
          <div className="md:grid md:grid-cols-1 md:lg:grid-cols-3 md:gap-8">
            {/* Product Images */}
            <div className="md:lg:col-span-2 bg-white md:rounded-lg md:p-4">
              {isMobile ? (
                <div className="w-full h-[80vh] md:h-[500px] bg-white">
                  <Swiper
                    pagination={{
                      dynamicBullets: true,
                    }}
                    zoom={{
                      maxRatio: 3,
                    }}
                    navigation={processedGallery.length > 1}
                    modules={[Pagination, Navigation, Zoom]}
                    className="h-full"
                  >
                    {processedGallery.map((img, index) => (
                      <SwiperSlide key={index} className="flex items-center justify-center">
                        <div className="swiper-zoom-container h-full w-full">
                          <Image
                            src={imageError && index === 0 ? fallbackImage : img}
                            alt={`${name} image ${index + 1}`}
                            fill
                            sizes="100vw"
                            className="object-contain"
                            priority={index === 0}
                            onError={index === 0 ? handleImageError : undefined}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Thumbnails for desktop */}
                  <div className="flex md:flex-col gap-2 order-2 md:order-1">
                    {processedGallery.map((img, index) => (
                      <div 
                        key={index}
                        className="border-2 rounded overflow-hidden cursor-pointer w-16 h-16 relative transition-all duration-200 hover:border-primary-color"
                      >
                        <Image
                          src={img}
                          alt={`${name} thumbnail ${index}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                          onError={() => {
                            // If a thumbnail fails, replace it with fallback
                            processedGallery[index] = fallbackImage;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Main Image for desktop */}
                  <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden order-1 md:order-2">
                    <Image
                      src={imageError ? fallbackImage : processedMainImage}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain"
                      priority
                      onError={handleImageError}
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div ref={productHeaderRef} className="md:mt-0 mt-4 md:p-0 p-4 bg-white md:bg-transparent">
              <div>
                <div className="inline-block mb-2 px-3 py-1 bg-primary-color bg-opacity-20 text-primary-color rounded-full text-sm">
                  {category}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{name}</h1>
                <p className="text-2xl font-bold text-primary-color mt-2">
                  {currency} {formatPrice(price)}
                </p>
              </div>
            
              <div className="mt-4">
                <a
                  href={whatsappLink || `https://wa.me/?text=I'm interested in ${name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  <FaWhatsapp size={20} className="mr-2" />
                  Contact via WhatsApp
                </a>
              </div>
              
              {/* Mobile-first tabs using Shadcn UI */}
              <div className="mt-8 w-full">
                <Tabs defaultValue="description" onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="benefits">Benefits</TabsTrigger>
                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="mt-4">
                    <div className={cn(
                      "prose prose-lg max-w-none",
                      !isExpanded && isMobile && "max-h-60 overflow-hidden relative"
                    )}>
                      {description ? (
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                      ) : (
                        <p>No description available for this product.</p>
                      )}
                      
                      {isMobile && !isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                      )}
                    </div>
                    
                    {isMobile && (
                      <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center justify-center w-full mt-2 py-2 text-primary-color"
                      >
                        {isExpanded ? (
                          <>
                            <FaChevronUp className="mr-1" /> Show less
                          </>
                        ) : (
                          <>
                            <FaChevronDown className="mr-1" /> Read more
                          </>
                        )}
                      </button>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="benefits" className="mt-4">
                    <div className={cn(
                      "prose prose-lg max-w-none",
                      !isExpanded && isMobile && "max-h-60 overflow-hidden relative"
                    )}>
                      {benefits ? (
                        <div dangerouslySetInnerHTML={{ __html: benefits }} />
                      ) : (
                        <p>No benefits information available for this product.</p>
                      )}
                      
                      {isMobile && !isExpanded && benefits && (
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                      )}
                    </div>
                    
                    {isMobile && benefits && (
                      <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center justify-center w-full mt-2 py-2 text-primary-color"
                      >
                        {isExpanded ? (
                          <>
                            <FaChevronUp className="mr-1" /> Show less
                          </>
                        ) : (
                          <>
                            <FaChevronDown className="mr-1" /> Read more
                          </>
                        )}
                      </button>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="ingredients" className="mt-4">
                    <div className={cn(
                      "prose prose-lg max-w-none",
                      !isExpanded && isMobile && "max-h-60 overflow-hidden relative"
                    )}>
                      {ingredients ? (
                        <div dangerouslySetInnerHTML={{ __html: ingredients }} />
                      ) : (
                        <p>No ingredients information available for this product.</p>
                      )}
                      
                      {isMobile && !isExpanded && ingredients && (
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
                      )}
                    </div>
                    
                    {isMobile && ingredients && (
                      <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="flex items-center justify-center w-full mt-2 py-2 text-primary-color"
                      >
                        {isExpanded ? (
                          <>
                            <FaChevronUp className="mr-1" /> Show less
                          </>
                        ) : (
                          <>
                            <FaChevronDown className="mr-1" /> Read more
                          </>
                        )}
                      </button>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Quick Category Links */}
              <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FaLeaf className="mr-2 text-primary-color" />
                  Product Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, index) => (
                    <Link 
                      key={index} 
                      href={`/product_category/${cat.toLowerCase().replace(/ /g, '-')}`}
                      className="px-3 py-1 bg-gray-100 hover:bg-primary-color hover:text-white text-sm rounded-full transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        
          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <div className="mt-12 pb-24 md:pb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 px-4 md:px-0">
                Similar Products
              </h2>
              
              {isMobile ? (
                <div className="overflow-x-auto hide-scrollbar pb-4">
                  <div className="flex space-x-4 px-4">
                    {similarProducts.map((product) => (
                      <div key={product.id} className="w-40 flex-shrink-0">
                        <ProductCardCompact
                          id={parseInt(product.id)}
                          name={product.name}
                          slug={product.slug}
                          image={product.image}
                          price={parseFloat(product.price)}
                          currency={product.currency}
                          whatsappLink={product.whatsappLink}
                          category={product.category}
                          backgroundColor="bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {similarProducts.map((product) => (
                    <ProductCardCompact
                      key={product.id}
                      id={parseInt(product.id)}
                      name={product.name}
                      slug={product.slug}
                      image={product.image}
                      price={parseFloat(product.price)}
                      currency={product.currency}
                      whatsappLink={product.whatsappLink}
                      category={product.category}
                      backgroundColor="bg-white"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Floating Action Button for WhatsApp */}
      {isMobile && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="fixed bottom-20 right-4 z-30"
        >
          <a
            href={whatsappLink || `https://wa.me/?text=I'm interested in ${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg"
          >
            <FaWhatsapp size={28} />
          </a>
        </motion.div>
      )}
      
      {/* Share menu */}
      <AnimatePresence>
        {isShareMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-32 right-4 bg-white rounded-lg shadow-xl p-4 z-30"
          >
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setIsShareMenuOpen(false);
                }}
                className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                <span>Copy link</span>
              </button>
              <a
                href={`https://wa.me/?text=Check out ${name} at ${window.location.href}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg"
              >
                <FaWhatsapp className="mr-2 text-green-500" />
                <span>Share via WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Click outside to close share menu */}
      {isShareMenuOpen && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setIsShareMenuOpen(false)}
        />
      )}

      {/* Hide scrollbar styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Swiper pagination styling */
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: white;
          transform: scale(1.2);
        }
        
        /* Define prose styles for product content */
        .prose h1, 
        .prose h2, 
        .prose h3 {
          color: var(--primary-dark);
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        
        .prose p {
          margin-bottom: 1em;
          line-height: 1.7;
        }
        
        .prose ul {
          margin-left: 1.5em;
          list-style-type: disc;
        }
        
        .prose ol {
          margin-left: 1.5em;
          list-style-type: decimal;
        }
        
        .prose li {
          margin-bottom: 0.5em;
        }
        
        .prose a {
          color: var(--primary-color);
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}