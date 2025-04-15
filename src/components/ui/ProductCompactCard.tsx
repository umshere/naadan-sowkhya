'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/Card";
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ProductCompactCardProps {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: string;
  currency: string;
  whatsappLink: string;
}

export function ProductCompactCard({
  id,
  name,
  slug,
  image,
  price,
  currency,
  whatsappLink,
}: ProductCompactCardProps) {
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className="overflow-hidden h-full">
        <Link href={`/products/${slug}`} className="block h-full">
          <div className="relative aspect-square bg-gray-50">
            <Image
              src={imageError ? '/images/placeholder.jpg' : image}
              alt={name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 33vw, 25vw"
              onError={handleImageError}
              priority
            />
          </div>
          <div className="p-2">
            <h3 className="text-sm font-medium line-clamp-1 mb-1">
              {name}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">
                {currency} {formatPrice(price)}
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-green-600 hover:text-green-700 transition-colors"
                aria-label="Contact on WhatsApp"
              >
                <FaWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}
