'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface AboutSectionProps {
  title: string;            // e.g. "Natural Ayurvedic Excellence"
  description: string[];    // Paragraphs of text
  buttonText: string;       // e.g. "Read More"
  buttonLink: string;       // e.g. "/about"
  images: string[];         // Array of image URLs
}

const AboutSection = ({
  title,
  description,
  buttonText,
  buttonLink,
  images,
}: AboutSectionProps) => {
  // State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Refs
  const sectionRef = useRef<HTMLElement>(null);

  // **1) Auto-rotate images every 5 seconds**
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // **2) Intersection Observer for fade-in animation**
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      {/* Subtle background texture (optional) */}
      <div className="absolute inset-0 organic-texture opacity-10 pointer-events-none"></div>

      {/* Container */}
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Top: "About Us" heading block */}
        <div className="text-center mb-12 md:mb-16">
          <span className="block text-sm font-semibold tracking-wider text-[var(--tertiary-color)] uppercase">
            About Us
          </span>
          <h2 className="heading-serif text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-3 text-[var(--primary-dark)]">
            {title}
          </h2>
          <div className="mx-auto w-24 h-1 bg-[var(--tertiary-color)]"></div>
        </div>

        {/* Main two-column grid */}
        <div
          className={`
            grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center
            transition-all duration-700 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {/* ---- LEFT COLUMN: Text & Highlights ---- */}
          <div>
            {/* 1) "Our Promise" highlight box */}
            <div className="mb-8 p-6 bg-[var(--primary-light)] rounded-lg border-l-4 border-[var(--primary-color)] shadow-sm">
              <h3 className="font-serif text-xl text-[var(--primary-color)] mb-2">
                Our Promise
              </h3>
              <p className="text-base text-[var(--primary-dark)] font-medium leading-relaxed">
                {description[0]}
              </p>
            </div>

            {/* 2) Benefits (icons + short text) */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 h-10 w-10 bg-[var(--tertiary-color)] bg-opacity-20 rounded-full flex items-center justify-center">
                  {/* Example Leaf Icon */}
                  <svg className="w-5 h-5 text-[var(--primary-color)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.6 9.2A.8.8 0 015.4 8h9.2a.8.8 0 010 1.6H5.4a.8.8 0 01-.8-.8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-lg text-[var(--primary-color)]">
                    100% Natural
                  </h4>
                  <p className="mt-1 text-gray-700 text-sm leading-relaxed">
                    Free from preservatives, chemicals, and artificial ingredients.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 h-10 w-10 bg-[var(--tertiary-color)] bg-opacity-20 rounded-full flex items-center justify-center">
                  {/* Example Drop Icon */}
                  <svg className="w-5 h-5 text-[var(--primary-color)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.75 16.5a5.75 5.75 0 100-11.5 5.75 5.75 0 000 11.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-lg text-[var(--primary-color)]">
                    Traditional Methods
                  </h4>
                  <p className="mt-1 text-gray-700 text-sm leading-relaxed">
                    Crafted with ancient Ayurvedic principles and techniques.
                  </p>
                </div>
              </div>
            </div>

            {/* 3) Remaining paragraphs */}
            <div className="space-y-4 mb-8">
              {description.slice(1).map((paragraph, index) => (
                <p key={index} className="text-[var(--text-dark)] text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* 4) CTA Button */}
            <Link 
              href={buttonLink}
              className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] text-white rounded-md 
                         font-semibold hover:bg-opacity-90 transition-colors"
            >
              {buttonText}
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* ---- RIGHT COLUMN: Rotating Image + Overlays ---- */}
          <div className="relative">
            {/* Decorative background behind the image */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-lg bg-[var(--tertiary-color)] bg-opacity-20 z-0 pointer-events-none" />
            
            {/* Main image wrapper */}
            <div className="relative h-[400px] md:h-[450px] rounded-lg overflow-hidden shadow-lg border border-white z-10">
              {images.map((image, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out
                    ${i === currentImageIndex ? 'opacity-100' : 'opacity-0'}
                  `}
                >
                  <OptimizedImage
                    src={image}
                    alt={`Naadan Sowkhya - Image ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              ))}

              {/* Dots for image navigation */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20 space-x-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 
                      ${i === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white'
                      }
                    `}
                    aria-label={`Switch to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Simplified badge at bottom-right */}
            <div className="absolute bottom-4 right-4 bg-[var(--primary-color)] text-white 
                            rounded-full h-20 w-20 flex items-center justify-center shadow-lg z-20
                            hover:scale-105 transition-transform duration-300"
            >
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-wider">Pure</div>
                <div className="font-serif font-bold text-base">Ayurveda</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
