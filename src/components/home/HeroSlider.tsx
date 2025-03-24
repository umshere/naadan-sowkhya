'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface SlideProps {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface HeroSliderProps {
  slides: SlideProps[];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousSlide, setPreviousSlide] = useState(-1);
  const slideRef = useRef<HTMLDivElement>(null);

  // Scroll-based parallax effect
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setPreviousSlide(currentSlide);
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    if (isAnimating) return;
    setPreviousSlide(currentSlide);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;
    setPreviousSlide(currentSlide);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.2,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.8,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      ref={slideRef}
      style={{ y: parallaxY }}
      className="relative h-[600px] lg:h-[750px] xl:h-[850px] overflow-hidden bg-[var(--primary-light)]"
    >
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                  quality={90}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"
                  style={{ opacity }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                  <motion.div 
                    className="max-w-5xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {/* Brand Label */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-base md:text-lg lg:text-xl font-semibold tracking-wider uppercase mb-4 text-white/90 drop-shadow-lg"
                    >
                      NAADAN SOWKHYA
                    </motion.p>

                    {/* Main Heading */}
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 tracking-wider drop-shadow-lg text-white"
                    >
                      <span className="relative inline-block">
                        {slide.title}
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.8, duration: 0.6 }}
                          className="absolute -bottom-2 left-0 right-0 h-1 bg-[var(--tertiary-color)]"
                          style={{ transformOrigin: 'left' }}
                        />
                      </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="text-white/90 text-base md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      <Link
                        href={slide.buttonLink}
                        className="btn-elegant group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[var(--primary-color)] rounded-lg hover:bg-[var(--primary-color)]/90 transition-all duration-300"
                      >
                        <span className="relative z-10">{slide.buttonText}</span>
                        <span className="absolute inset-0 overflow-hidden rounded-lg">
                          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                        </span>
                        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--tertiary-color)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Dots */}
      <motion.div 
        className="absolute bottom-4 md:bottom-8 left-0 right-0 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex justify-center space-x-2 md:space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 
                ${index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/40 hover:bg-white/60'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Navigation Arrows */}
      <motion.div 
        className="absolute left-2 right-2 top-1/2 -translate-y-1/2 z-30 flex justify-between md:left-8 md:right-8 lg:left-12 lg:right-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <button
          onClick={goToPrevSlide}
          disabled={isAnimating}
          className="p-2 md:p-3 rounded-full bg-black/10 hover:bg-black/20 active:bg-black/30 
                     backdrop-blur-[2px] border border-white/10 shadow-sm transform 
                     transition-all duration-300 hover:scale-105 group
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-white/20"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white/90 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNextSlide}
          disabled={isAnimating}
          className="p-2 md:p-3 rounded-full bg-black/10 hover:bg-black/20 active:bg-black/30 
                     backdrop-blur-[2px] border border-white/10 shadow-sm transform 
                     transition-all duration-300 hover:scale-105 group
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-white/20"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white/90 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default HeroSlider;
