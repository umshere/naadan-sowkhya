'use client';

import { useState } from 'react';
import homepage from '@/data/homepage.json';
import testimonialImages from '@/data/testimonial-images.json';
import ImageLightbox from '@/components/ui/ImageLightbox';
import TestimonialCarousel from '@/components/ui/TestimonialCarousel';

interface Testimonial {
  id: number;
  name: string;
  text: string;
}

export default function TestimonialsPage() {
  const testimonials: Testimonial[] = homepage.testimonials;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handle image click - open the lightbox with the selected image
  const handleImageClick = (imagePath: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default navigation
    setSelectedImage(imagePath);
  };

  // Close the lightbox
  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--natural-light)] to-white">
      {/* Text Testimonials Carousel Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[var(--primary-color)] mb-12">
            Our Customer Stories
          </h1>
          
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--primary-color)] mb-12">
            Testimonial Photo Gallery
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
            {testimonialImages.imageGallery.map((image) => (
              <div
                key={image.id}
                className="aspect-square relative rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300"
                onClick={(e) => handleImageClick(image.path, e)}
              >
                <img
                  src={image.path}
                  alt={`Customer testimonial photo ${image.id}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Modern hover effect with subtle overlay and zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/90 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <svg
                      className="w-6 h-6 text-[var(--primary-color)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox for full-screen image viewing */}
      {selectedImage && (
        <ImageLightbox
          isOpen={!!selectedImage}
          onClose={handleCloseLightbox}
          imageSrc={selectedImage}
          imageAlt="Customer testimonial"
        />
      )}
    </div>
  );
}