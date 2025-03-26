'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const minSwipeDistance = 50;
  const verticalSwipeThreshold = 30;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8
    })
  };

  const quoteIconVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 0.2, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = Math.abs(touchStartY.current - touchEndY);

    // Only handle horizontal swipes if vertical movement is minimal
    if (deltaY < verticalSwipeThreshold) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          paginate(1); // Swipe left
        } else {
          paginate(-1); // Swipe right
        }
      }
    }

    // Reset touch coordinates
    touchStartX.current = 0;
    touchStartY.current = 0;
  };

  return (
    <motion.div 
      className={`relative bg-white rounded-2xl shadow-xl ${compact ? 'p-6 md:p-8' : 'p-8 md:p-12'} touch-pan-y select-none`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-4xl mx-auto overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="text-center"
          >
            <motion.svg
              className={`mx-auto mb-6 text-[var(--tertiary-color)] ${
                compact ? 'w-10 h-10' : 'w-12 h-12'
              }`}
              fill="currentColor"
              viewBox="0 0 32 32"
              variants={quoteIconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </motion.svg>

            <motion.blockquote
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, delay: 0.2 }}
              className={`text-gray-700 leading-relaxed mb-8 ${
                compact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
              }`}
            >
              {testimonials[currentIndex].text}
            </motion.blockquote>

            <motion.p
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-lg font-semibold text-[var(--primary-color)]"
            >
              {testimonials[currentIndex].name}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center absolute left-4 right-4 top-1/2 -translate-y-1/2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Previous testimonial"
        >
          <motion.svg 
            className="w-6 h-6 text-[var(--primary-color)]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            whileHover={{ x: -2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </motion.svg>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Next testimonial"
        >
          <motion.svg 
            className="w-6 h-6 text-[var(--primary-color)]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            whileHover={{ x: 2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-8">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            initial={false}
            animate={{
              scale: index === currentIndex ? 1.25 : 1,
              backgroundColor: index === currentIndex 
                ? 'var(--primary-color)' 
                : 'rgba(var(--tertiary-color-rgb), 0.5)'
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className="w-3 h-3 rounded-full transition-colors duration-300"
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
