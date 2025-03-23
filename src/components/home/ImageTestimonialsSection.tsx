'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImageTestimonial {
  id: number;
  name: string;
  image: string;
}

interface ImageTestimonialsSectionProps {
  imageTestimonials: ImageTestimonial[];
}

export default function ImageTestimonialsSection({ imageTestimonials }: ImageTestimonialsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for fade/slide in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 bg-white"
      id="image-gallery-section"
    >
      <div className="container mx-auto px-4 relative z-20">
        <h2
          className={`section-title text-center text-3xl md:text-4xl font-bold mb-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Customer Photos
        </h2>
        
        <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            See how our customers are enjoying our products in their daily lives
          </p>
          
          {/* Image Testimonials Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageTestimonials.map((item) => (
              <div 
                key={item.id} 
                className="relative overflow-hidden rounded-lg aspect-square group"
              >
                <div className="w-full h-full relative">
                  <Image
                    src={item.image}
                    alt={`Photo from ${item.name}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Name overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white font-medium">{item.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View more link */}
          <div className="text-center mt-10">
            <a
              href="/testimonials#photo-gallery"
              className="inline-flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors"
            >
              <span className="text-lg font-semibold">View All Photos</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
