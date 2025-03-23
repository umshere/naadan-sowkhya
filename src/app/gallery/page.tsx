'use client';

import galleryData from '@/data/gallery.json';
import GallerySection from '@/components/home/GallerySection';
import { useState, useEffect } from 'react';

export default function GalleryPage() {
  const { images, categories } = galleryData;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading of images
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredImages = selectedCategory
    ? images.filter((img) => img.category === selectedCategory)
    : images;

  return (
    <div className="min-h-screen">
      {/* Page Header with Wave Pattern */}
      <div className="relative bg-gradient-to-r from-primary-color to-primary-dark py-16 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-10" />
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="white"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center  py-4 px-8 rounded-lg">
            Our Gallery
          </h1>
          <p className="text-center  mt-4 max-w-2xl mx-auto p-4 rounded-lg text-black-40!">
            A visual journey through our commitment to natural, preservative-free products and sustainable practices.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${!selectedCategory
                ? 'bg-primary-dark text-black! shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${selectedCategory === category.id
                  ? 'bg-primary-dark text-black! shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="pb-16">
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
      </div>
    </div>
  );
}
