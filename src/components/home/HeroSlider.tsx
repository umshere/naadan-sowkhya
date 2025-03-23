'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToNextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setPreviousSlide(currentSlide);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const goToPrevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setPreviousSlide(currentSlide);
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setPreviousSlide(currentSlide);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  return (
    <div
      ref={slideRef}
      className="relative h-[650px] overflow-hidden bg-[var(--primary-light)]"
    >
      {/* Optional decorative/leaf elements if desired */}
      
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 z-20'
              : index === previousSlide
              ? 'opacity-0 z-10'
              : 'opacity-0 z-0'
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className={`object-cover transition-transform duration-1500 ease-out ${
                index === currentSlide ? 'scale-100 filter-none' : 'scale-105'
              }`}
              sizes="100vw"
              quality={90}
            />

            {/* Dark overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white">
              <div className="max-w-4xl mx-auto text-center">
                {/* NAADAN SOWKHYA Label */}
                <div className="overflow-hidden mb-2">
                  <p
                    className={`text-base md:text-lg font-semibold tracking-wider uppercase transition-all duration-700 delay-100 drop-shadow-sm ${
                      index === currentSlide
                        ? 'opacity-100 transform-none text-white'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    NAADAN SOWKHYA
                  </p>
                </div>

                {/* Main Heading — set to white */}
                <h1
                  className={`heading-1 !text-white font-serif font-bold text-3xl md:text-5xl xl:text-6xl mb-6 tracking-wider drop-shadow-sm transition-all duration-700 delay-200 ${
                    index === currentSlide
                      ? 'opacity-100 transform-none text-white'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <span className="relative inline-block">
                    {slide.title}
                    {/* Underline effect still uses var(--tertiary-color) */}
                    <span
                      className={`absolute -bottom-2 left-0 right-0 h-1 bg-[var(--tertiary-color)] transform transition-transform duration-1000 ease-out delay-500 ${
                        index === currentSlide ? 'scale-x-100' : 'scale-x-0'
                      }`}
                      style={{ transformOrigin: 'left' }}
                    ></span>
                  </span>
                </h1>

                {/* Subheading — also white */}
                <p
                  className={`body-large  !text-white text-sm md:text-lg xl:text-xl mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-300 drop-shadow-sm ${
                    index === currentSlide
                      ? 'opacity-100 transform-none text-white'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  {slide.subtitle}
                </p>

                {/* Button */}
                <div
                  className={`transition-all duration-700 delay-400 ${
                    index === currentSlide
                      ? 'opacity-100 transform-none'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <Link
                    href={slide.buttonLink}
                    className="btn-elegant group relative inline-flex items-center justify-center px-8 py-3.5 rounded-md text-lg font-semibold text-white"
                  >
                    <span className="relative z-10">{slide.buttonText}</span>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--tertiary-color)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-30">
        <div className="flex justify-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-[var(--tertiary-color)] scale-125'
                  : 'bg-white/50 hover:bg-[var(--tertiary-color)]/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Left/Right Navigation Arrows */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-4 md:px-8">
        <button
          onClick={goToPrevSlide}
          disabled={isAnimating}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 
                     backdrop-blur-sm border border-white/20 shadow-lg transform hover:scale-105 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 text-white"
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
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 
                     backdrop-blur-sm border border-white/20 shadow-lg transform hover:scale-105 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 text-white"
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
      </div>
    </div>
  );
};

export default HeroSlider;
