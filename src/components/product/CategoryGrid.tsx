'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Category {
  id: string | number;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

interface CategoryGridProps {
  categories: Category[];
  variant?: 'grid' | 'row';
  className?: string;
}

export default function CategoryGrid({
  categories,
  variant = 'grid',
  className = '',
}: CategoryGridProps) {
  const [isScrolling, setIsScrolling] = useState(false);
  const touchStartRef = { current: { x: 0, time: 0 } };

  // Touch event handlers for improved mobile interaction
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      time: Date.now(),
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current.time) return;
    
    const deltaX = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
    
    // If horizontal scrolling is detected, mark as scrolling to prevent card interactions
    if (deltaX > 10) {
      setIsScrolling(true);
    }
  };

  const handleTouchEnd = () => {
    // Reset scroll state after a short delay
    setTimeout(() => setIsScrolling(false), 100);
    touchStartRef.current = { x: 0, time: 0 };
  };

  // Container classes based on variant
  const containerClasses = {
    grid: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
    row: "flex overflow-x-auto hide-scrollbar space-x-4 pb-4",
  };

  // Card classes based on variant
  const cardClasses = {
    grid: "w-full",
    row: "min-w-[160px] w-[160px]",
  };

  return (
    <div
      className={cn(variant === 'row' ? "px-4" : "", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={cn(containerClasses[variant], variant === 'row' ? "snap-x snap-mandatory" : "")}>
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className={cn(cardClasses[variant], variant === 'row' ? "snap-start" : "")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={`/product_category/${category.slug}`}
              className={cn(
                isScrolling ? 'pointer-events-none' : '',
                "block rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200"
              )}
              onClick={(e) => isScrolling && e.preventDefault()}
            >
              <div className="relative">
                {/* Category Image */}
                <div className="relative aspect-square overflow-hidden bg-cream">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 160px, 200px"
                    className="object-contain p-2"
                  />
                </div>

                {/* Category Info */}
                <div className="bg-white p-3">
                  <h3 className="font-medium text-gray-900 line-clamp-1">{category.name}</h3>
                  {category.description && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{category.description}</p>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Styles for hiding scrollbar while keeping functionality */}
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
  );
}