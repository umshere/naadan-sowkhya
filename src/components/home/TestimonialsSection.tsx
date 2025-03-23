'use client';

import { useRef, useState, useEffect } from 'react';
import TestimonialCarousel from '@/components/ui/TestimonialCarousel';

interface Testimonial {
  id: number;
  name: string;
  text: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
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
      className="relative py-16 bg-[var(--natural-light)]"
      id="testimonials-section"
    >
      {/* Top decorative wave */}
      <div className="absolute left-0 w-full overflow-hidden h-16 -top-1 z-10 opacity-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="var(--primary-color)"
            opacity="0.2"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <h2
          className={`section-title text-center text-3xl md:text-4xl font-bold transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Customer Reviews
        </h2>

        <div
          className={`mx-auto max-w-3xl relative mt-10 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <TestimonialCarousel testimonials={testimonials} compact />

          {/* Link to all testimonials */}
          <div className="text-center mt-12">
            <a
              href="/testimonials"
              className="inline-flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors"
            >
              <span className="text-lg font-semibold">View All Reviews</span>
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

      {/* Bottom decorative wave */}
      <div className="absolute left-0 w-full overflow-hidden h-16 -bottom-1 z-10 opacity-30 transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="var(--primary-color)"
            opacity="0.2"
          ></path>
        </svg>
      </div>
    </section>
  );
}
