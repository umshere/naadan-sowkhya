'use client';

import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  text: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  compact?: boolean;
}

export default function TestimonialCarousel({ testimonials, compact = false }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className={`relative bg-white rounded-2xl shadow-xl ${compact ? 'p-6 md:p-8' : 'p-8 md:p-12'}`}>
      <div className="max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`transition-all duration-500 ${
              index === currentIndex
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 absolute top-0 left-0 -translate-y-4'
            }`}
          >
            {index === currentIndex && (
              <div className="text-center">
                <svg
                  className={`mx-auto mb-6 text-[var(--tertiary-color)] opacity-20 ${
                    compact ? 'w-10 h-10' : 'w-12 h-12'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <blockquote className={`text-gray-700 leading-relaxed mb-8 ${
                  compact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
                }`}>
                  {testimonial.text}
                </blockquote>
                <p className="text-lg font-semibold text-[var(--primary-color)]">
                  {testimonial.name}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center absolute left-4 right-4 top-1/2 -translate-y-1/2">
        <button
          onClick={goToPrev}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Previous testimonial"
        >
          <svg className="w-6 h-6 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Next testimonial"
        >
          <svg className="w-6 h-6 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[var(--primary-color)] scale-125'
                : 'bg-[var(--tertiary-color)] bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
