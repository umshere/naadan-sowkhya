'use client';

import galleryData from '@/data/gallery.json';
import GallerySection from '@/components/home/GallerySection';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GalleryPage() {
  const { images, categories } = galleryData;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredImages = selectedCategory
    ? images.filter((img) => img.category === selectedCategory)
    : images;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gray-50 py-12 md:py-16"
      >
        <div className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-primary-color"
            >
              Our Visual Journey
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl font-medium mb-4 leading-relaxed text-primary-color"
            >
              Experience our commitment to natural, preservative-free products through authentic manufacturing processes and dedicated team excellence
            </motion.p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="w-32 h-1 bg-primary-color/30 mx-auto rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-300
              ${!selectedCategory
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
          >
            All Categories
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-300
                ${selectedCategory === category.id
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="pb-16"
      >
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
          </div>
        ) : (
          <GallerySection 
            images={filteredImages.map((img) => ({
              id: img.id,
              src: img.src,
              alt: img.alt,
              category: img.category
            }))} 
            title=""
          />
        )}
      </motion.div>
    </div>
  );
}
