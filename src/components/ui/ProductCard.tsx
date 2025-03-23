'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: string;
  currency: string;
  whatsappLink: string;
  className?: string;
}

export default function ProductCard({
  id,
  name,
  slug,
  image,
  price,
  currency,
  whatsappLink,
  category,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Format the price properly, handling both string and number types
  const formatPrice = (price: number | string): string => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    
    // If it's a string but can be converted to a number
    const numPrice = parseFloat(price);
    if (!isNaN(numPrice)) {
      return numPrice.toFixed(2);
    }
    
    // If it can't be converted, return as is
    return price.toString();
  };

  // Handle image paths more robustly
  const getImagePath = (imagePath: string): string => {
    // If the path already starts with http/https, it's an external URL
    if (imagePath?.startsWith('http')) {
      return imagePath;
    }
    
    // If the path already includes /images/, assume it's a correct path
    if (imagePath?.includes('/images/')) {
      return imagePath;
    }
    
    // For relative paths that don't have the /images/ prefix, add it
    if (imagePath && !imagePath.startsWith('/')) {
      return `/images/products/${imagePath}`;
    }
    
    // Return the image as is if it already has a leading slash
    return imagePath || '/images/placeholder.jpg';
  };

  // Use existing placeholder image from public directory
  const fallbackImage = "/images/placeholder.jpg";
  
  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  // Get first category word for the badge
  const categoryLabel = category?.split(' ')?.[0] || 'Product';

  // Process the image path
  const processedImagePath = getImagePath(image);

  return (
    <motion.div 
      className="relative flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-md w-full min-h-[400px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
    >
      {/* Product image with aspect ratio */}
      <div className="relative w-full pt-[100%] overflow-hidden bg-gray-100">
        <Link href={`/products/${slug}`} className="block absolute inset-0">
          <motion.div 
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={imageError ? fallbackImage : processedImagePath}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
              priority
              onError={handleImageError}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </motion.div>
        </Link>

        {/* Category badge */}
        <motion.div 
          className="absolute top-3 left-3 z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            className="inline-block bg-primary-color bg-opacity-80 text-white text-xs px-2 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
            animate={isHovered ? { y: [0, -2, 0], transition: { duration: 0.5 } } : {}}
          >
            {categoryLabel}
          </motion.span>
        </motion.div>

        {/* Hover overlay with animation */}
        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Product info */}
      <motion.div 
        className="flex flex-col flex-grow p-4 h-[180px] justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link href={`/products/${slug}`} className="block mb-auto">
          <motion.h4 
            className="text-lg font-medium text-gray-800 mb-3 line-clamp-2"
            whileHover={{ color: 'var(--primary-color)' }}
          >
            {name}
          </motion.h4>
        </Link>
        
        <motion.div 
          className="mt-auto flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.p 
            className="font-bold text-gray-900"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          >
            {currency} {formatPrice(price)}
          </motion.p>
          
          <motion.a
            href={whatsappLink || `https://wa.me/?text=I'm interested in ${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Contact on WhatsApp"
          >
            <motion.div
              animate={isHovered ? { 
                rotate: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.5 }
              } : {}}
            >
              <FaWhatsapp size={20} />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Corner decoration */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="absolute top-0 right-0 w-2 h-16 bg-primary-color transform rotate-45 origin-top-right"
          initial={{ scaleY: 0 }}
          animate={isHovered ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}
