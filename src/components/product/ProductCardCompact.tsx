'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface ProductCardCompactProps {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  currency: string;
  category: string;
  whatsappLink?: string;
  backgroundColor?: string;
  className?: string; // Added className prop
}

export default function ProductCardCompact({
  id,
  name,
  slug,
  image,
  price,
  currency,
  category,
  whatsappLink,
  backgroundColor = 'bg-white',
  className, // Destructure className
}: ProductCardCompactProps) {
  const [imageError, setImageError] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Format image path
  const formatImagePath = (imagePath: string): string => {
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
  
  const imageSrc = formatImagePath(image);
  const fallbackImage = '/images/placeholder.jpg';
  
  // Format price with two decimal places
  const formattedPrice = typeof price === 'number' 
    ? price.toFixed(2) 
    : parseFloat(String(price)).toFixed(2);
  
  // Handle WhatsApp click
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const whatsappUrl = whatsappLink || `https://wa.me/?text=I'm interested in ${name}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Link href={`/products/${slug}`} className={className}> {/* Apply className to the Link wrapper */}
      <motion.div
        className={cn(
          "rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 h-full", // Added h-full here for consistency if needed
          backgroundColor,
          isPressed ? "scale-95" : "scale-100"
        )}
        onTapStart={() => setIsPressed(true)}
        onTap={() => setIsPressed(false)}
        onTapCancel={() => setIsPressed(false)}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative aspect-square">
          <Image
            src={imageError ? fallbackImage : imageSrc}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={handleWhatsAppClick}
              className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md"
              aria-label="Contact via WhatsApp"
            >
              <FaWhatsapp className="text-white text-sm" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white px-2 py-1 text-xs">
            {category}
          </div>
        </div>
        
        <div className="p-2">
          <h3 className="text-sm font-medium line-clamp-2 h-10">{name}</h3>
          <p className="text-sm font-bold text-primary-color mt-1">
            {currency} {formattedPrice}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
