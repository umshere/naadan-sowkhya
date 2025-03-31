'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface ProductListItemProps {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: string;
  currency: string;
  whatsappLink: string;
}

export function ProductListItem({
  id,
  name,
  slug,
  image,
  price,
  currency,
  whatsappLink,
  category,
}: ProductListItemProps) {
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
      className="w-full"
    >
      <Card className="overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Image Container */}
          <div className="relative w-full sm:w-48 h-48 bg-gray-50">
            <Link href={`/products/${slug}`}>
              <div className="relative w-full h-full">
                <Image
                  src={imageError ? '/images/placeholder.jpg' : image}
                  alt={name}
                  fill
                  className="object-contain p-2 transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 200px"
                  onError={handleImageError}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Content Container */}
          <div className="flex flex-col flex-grow p-4">
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <Link href={`/products/${slug}`}>
                  <h3 className="text-lg font-semibold hover:text-primary-color transition-colors">
                    {name}
                  </h3>
                </Link>
                <span className="inline-flex items-center rounded-full bg-primary-color/10 px-2.5 py-0.5 text-xs font-medium text-primary-color">
                  {category}
                </span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <p className="text-xl font-bold text-gray-900">
                  {currency} {formatPrice(price)}
                </p>
                <div className="flex gap-2">
                  <Button asChild variant="outline">
                    <Link href={`/products/${slug}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    className="bg-green-600 hover:bg-green-700"
                    asChild
                  >
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Contact on WhatsApp"
                    >
                      <FaWhatsapp className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
