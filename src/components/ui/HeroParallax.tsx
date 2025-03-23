'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type HeroParallaxProps = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: string;
  darkOverlay?: boolean;
}

export default function HeroParallax({
  title,
  subtitle,
  backgroundImage = '/images/backgrounds/subtle-leaf-bg.svg',
  height = 'h-screen',
  darkOverlay = true,
}: HeroParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Create parallax effects for different elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '150%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={ref} 
      className={`relative ${height} overflow-hidden flex items-center justify-center`}
    >
      {/* Background with parallax effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full" 
        style={{ 
          y: backgroundY,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Optional dark overlay for better text readability */}
      {darkOverlay && (
        <div className="absolute inset-0 bg-black/40 z-10" />
      )}

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        {/* Title with parallax effect */}
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold text-white mb-6"
          style={{ 
            y: titleY,
            opacity 
          }}
        >
          {title}
        </motion.h1>
        
        {/* Subtitle with parallax effect if provided */}
        {subtitle && (
          <motion.p 
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto"
            style={{ 
              y: subtitleY,
              opacity 
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}