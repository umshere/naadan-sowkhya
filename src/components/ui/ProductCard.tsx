'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/Card";
import { FaWhatsapp } from 'react-icons/fa';
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
  className,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const formatPrice = (price: string): string => {
    const numPrice = parseFloat(price);
    return !isNaN(numPrice) ? numPrice.toFixed(2) : price;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      className={`h-full ${className || ''}`}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        {/* Image with aspect ratio */}
        <div className="relative pt-[100%] overflow-hidden bg-gray-50">
          <Link href={`/products/${slug}`}>
            <div className="absolute inset-0">
              <Image
                src={imageError ? '/images/placeholder.jpg' : image}
                alt={name}
                fill
                className="object-contain p-3 transition-transform hover:scale-105"
                onError={handleImageError}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </Link>
          {/* Category badge */}
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center rounded-md bg-sage-green/85 px-3 py-1.5 text-xs font-medium text-white shadow-sm backdrop-blur-[2px] ring-1 ring-sage-green/30" style={{ backgroundColor: 'rgba(104, 134, 98, 0.85)' }}>
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4">
          <Link href={`/products/${slug}`} className="flex-grow">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-primary-color transition-colors">
              {name}
            </h3>
          </Link>

          <div className="flex items-center justify-between mt-auto pt-2 border-t">
            <p className="text-lg font-bold text-gray-900">
              {currency} {formatPrice(price)}
            </p>
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contact on WhatsApp"
            >
              <FaWhatsapp className="h-5 w-5" />
            </motion.a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
