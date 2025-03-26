'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  text: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  compact?: boolean;
}

const TestimonialCarousel = ({ testimonials, compact }: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Calculate the maximum height among all testimonials
    const maxHeight = testimonialRefs.current.reduce((max, ref) => {
      if (ref) {
        const height = ref.getBoundingClientRect().height;
        return height > max ? height : max;
      }
      return max;
    }, 0);
    setContainerHeight(maxHeight);
  }, [testimonials]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div 
        className="overflow-hidden relative"
        style={{ height: containerHeight || 'auto' }}
      >
        <div className="flex transition-transform duration-500 ease-in-out"
             style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={el => testimonialRefs.current[index] = el}
              className="w-full flex-shrink-0 px-4"
            >
              <motion.div
                className="bg-white rounded-xl p-6 md:p-8 shadow-lg flex flex-col h-full"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
              >
                <div className="flex-grow">
                  <p className="text-gray-600 text-lg mb-6">{testimonial.text}</p>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-[var(--primary-color)]">{testimonial.name}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-50"
        aria-label="Previous testimonial"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-50"
        aria-label="Next testimonial"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[var(--primary-color)] w-4' : 'bg-gray-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
