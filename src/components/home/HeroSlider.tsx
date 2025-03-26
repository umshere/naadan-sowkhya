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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Enhanced touch tracking state
  const touchRef = useRef<{
    startX: number;
    startY: number;
    lastY: number;
    isVerticalScroll: boolean;
    scrollStartTime: number;
  }>({
    startX: 0,
    startY: 0,
    lastY: 0,
    isVerticalScroll: false,
    scrollStartTime: 0
  });
  const [isSwiping, setIsSwiping] = useState(false);

  // Minimum swipe distance and timing (in px and ms)
  const minSwipeDistance = 40;
  const minVerticalSwipe = 10;
  const swipeTimeThreshold = 300; // ms

  // Debug logging in development
  const logTouch = (event: string, data: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`HeroSlider Touch Event - ${event}:`, data);
    }
  };

  // Scroll-based parallax effect for desktop only
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
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

  // Enhanced touch event handling
  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    touchRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      lastY: touch.clientY,
      isVerticalScroll: false,
      scrollStartTime: Date.now()
    };
    setIsSwiping(false);
    
    logTouch('Start', {
      x: touch.clientX,
      y: touch.clientY,
      time: touchRef.current.scrollStartTime
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const touch = e.targetTouches[0];
    const deltaX = touch.clientX - touchRef.current.startX;
    const deltaY = touch.clientY - touchRef.current.startY;
    const moveY = touch.clientY - touchRef.current.lastY;
    touchRef.current.lastY = touch.clientY;

    logTouch('Move', {
      deltaX,
      deltaY,
      moveY,
      isVerticalScroll: touchRef.current.isVerticalScroll
    });

    // Allow unrestricted vertical scrolling initially
    if (!touchRef.current.isVerticalScroll && Math.abs(deltaY) > minVerticalSwipe) {
      touchRef.current.isVerticalScroll = Math.abs(deltaY) > Math.abs(deltaX);
      if (touchRef.current.isVerticalScroll) {
        return; // Exit early to allow natural scrolling
      }
    }

    // Handle horizontal swipes
    if (!touchRef.current.isVerticalScroll && Math.abs(deltaX) > minVerticalSwipe) {
      setIsSwiping(true);
      e.preventDefault();

      // Add visual feedback during swipe with damping
      if (slideRef.current) {
        const damping = 0.3; // Reduce movement by 70%
        const maxOffset = containerRef.current.offsetWidth * 0.5; // Limit movement to 50% of width
        const dampedDelta = Math.min(Math.abs(deltaX * damping), maxOffset) * Math.sign(deltaX);
        slideRef.current.style.transform = `translateX(${dampedDelta}px)`;
      }
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current || touchRef.current.isVerticalScroll) return;

    const deltaX = e.changedTouches[0].clientX - touchRef.current.startX;
    const swipeTime = Date.now() - touchRef.current.scrollStartTime;
    
    logTouch('End', { 
      deltaX, 
      isSwiping, 
      swipeTime,
      isVerticalScroll: touchRef.current.isVerticalScroll 
    });

    if (isSwiping) {
      const isQuickSwipe = swipeTime < swipeTimeThreshold;
      const swipeThreshold = isQuickSwipe ? minSwipeDistance * 0.5 : minSwipeDistance;

      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
          goToPrevSlide();
        } else {
          goToNextSlide();
        }
      }

      // Reset transform with animation
      if (slideRef.current) {
        slideRef.current.style.transition = 'transform 0.3s ease-out';
        slideRef.current.style.transform = '';
        setTimeout(() => {
          if (slideRef.current) {
            slideRef.current.style.transition = '';
          }
        }, 300);
      }
    }

    // Reset state
    setIsSwiping(false);
    touchRef.current = {
      startX: 0,
      startY: 0,
      lastY: 0,
      isVerticalScroll: false,
      scrollStartTime: 0
    };
  };

  // Auto-rotate slides (pause during swipe)
  useEffect(() => {
    if (!isSwiping) {
      const interval = setInterval(() => {
        goToNextSlide();
      }, 6000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [currentSlide, isAnimating, isSwiping]);

  // Animation handling
  useEffect(() => {
    if (currentSlide !== previousSlide) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, previousSlide]);

  // Animation variants
  const slideVariants = {
    enter: {
      mobile: {
        opacity: 0,
      },
      desktop: {
        opacity: 0,
        scale: 1.2,
      }
    },
    center: {
      mobile: {
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
      desktop: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: [0.4, 0.0, 0.2, 1],
        },
      }
    },
    exit: {
      mobile: {
        opacity: 0,
        transition: { duration: 0.3 },
      },
      desktop: {
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 0.8,
          ease: [0.4, 0.0, 0.2, 1],
        },
      }
    }
  };

  const variants = isMobile ? 'mobile' : 'desktop';

  return (
    <motion.div
      ref={containerRef}
      className="swipeable-section relative h-[600px] lg:h-[750px] xl:h-[850px] overflow-hidden bg-[var(--primary-light)] w-full touch-pan-y"
      style={{
        y: isMobile ? 0 : parallaxY,
        transition: 'transform 0.3s ease-out',
        touchAction: 'pan-y pinch-zoom'
      }}
    >
      <div 
        ref={slideRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          {slides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                variants={slideVariants}
                initial={slideVariants.enter[variants]}
                animate={slideVariants.center[variants]}
                exit={slideVariants.exit[variants]}
                className="absolute inset-0 w-full h-full"
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={() => setIsAnimating(false)}
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
                    style={{ opacity: isMobile ? 0.6 : opacity }}
                  />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
                    <motion.div 
                      className="max-w-5xl mx-auto text-center"
                      initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: isMobile ? 0.2 : 0.3, duration: isMobile ? 0.3 : 0.6 }}
                    >
                      {/* Brand Label */}
                      <motion.p
                        initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: isMobile ? 0.2 : 0.4, duration: isMobile ? 0.3 : 0.6 }}
                        className="text-base md:text-lg lg:text-xl font-semibold tracking-wider uppercase mb-4 text-white/90 drop-shadow-lg"
                      >
                        NAADAN SOWKHYA
                      </motion.p>

                      {/* Main Heading */}
                      <motion.h1
                        initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: isMobile ? 0.3 : 0.5, duration: isMobile ? 0.3 : 0.6 }}
                        className="font-serif font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 tracking-wider drop-shadow-lg text-white"
                      >
                        <span className="relative inline-block">
                          {slide.title}
                          <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: isMobile ? 0.4 : 0.8, duration: isMobile ? 0.3 : 0.6 }}
                            className="absolute -bottom-2 left-0 right-0 h-1 bg-[var(--tertiary-color)]"
                            style={{ transformOrigin: 'left' }}
                          />
                        </span>
                      </motion.h1>

                      {/* Subtitle */}
                      <motion.p
                        initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: isMobile ? 0.3 : 0.6, duration: isMobile ? 0.3 : 0.6 }}
                        className="text-white/90 text-base md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
                      >
                        {slide.subtitle}
                      </motion.p>

                      {/* Button */}
                      <motion.div
                        initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: isMobile ? 0.4 : 0.7, duration: isMobile ? 0.3 : 0.6 }}
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
      </div>

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

      {/* Navigation Arrows - Desktop only */}
      <motion.div 
        className="absolute left-2 right-2 top-1/2 -translate-y-1/2 z-30 flex justify-between md:left-8 md:right-8 lg:left-12 lg:right-12 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {/* Previous/Next buttons */}
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

      {/* Mobile Swipe Indicator */}
      <motion.div 
        className="absolute bottom-16 left-0 right-0 z-30 md:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <div className="flex justify-center items-center space-x-4 text-white/70">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-xs font-medium">Swipe to navigate</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSlider;
