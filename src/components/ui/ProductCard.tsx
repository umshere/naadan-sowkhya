'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

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
    <div className="group relative flex flex-col h-full overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 min-h-[400px] w-full">
      {/* Product image with aspect ratio */}
      <div className="relative w-full pt-[100%] overflow-hidden bg-gray-100">
        <Link href={`/products/${slug}`} className="block absolute inset-0">
          <div className="relative w-full h-full">
            {/* Fixed image styling to prevent black overlay */}
            <Image
              src={imageError ? fallbackImage : processedImagePath}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              priority
              onError={handleImageError}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </div>
        </Link>

        {/* Category badge - adjusted z-index to ensure visibility */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block bg-primary-color bg-opacity-80 text-white text-xs px-2 py-1 rounded-full">
            {categoryLabel}
          </span>
        </div>
      </div>
      
      {/* Product info */}
      <div className="flex flex-col flex-grow p-4 h-[180px] justify-between">
        <Link href={`/products/${slug}`} className="block mb-auto">
          <h4 className="text-lg font-medium text-gray-800 mb-3 line-clamp-2 group-hover:text-primary-color transition-colors">
            {name}
          </h4>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <p className="font-bold text-gray-900">
            {currency} {formatPrice(price)}
          </p>
          
          <a
            href={whatsappLink || `https://wa.me/?text=I'm interested in ${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
            aria-label="Contact on WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
