'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

type ScrollAnimationSectionProps = {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  intensity?: number;
  type?: 'parallax' | 'fade' | 'scale' | 'rotate';
};

export default function ScrollAnimationSection({
  children,
  className = '',
  direction = 'up',
  intensity = 0.3,
  type = 'parallax',
}: ScrollAnimationSectionProps) {
  const { scrollYProgress } = useScroll();
  
  // Calculate transformation ranges based on direction and intensity
  const getTransformValues = () => {
    const transformDistance = 100 * intensity;
    
    switch (direction) {
      case 'up':
        return [transformDistance, 0];
      case 'down':
        return [-transformDistance, 0];
      case 'left':
        return [transformDistance, 0];
      case 'right':
        return [-transformDistance, 0];
      default:
        return [0, 0];
    }
  };

  // Set up transformations based on scroll position
  const transformValues = getTransformValues();
  
  // For parallax effect
  const y = direction === 'up' || direction === 'down' 
    ? useTransform(scrollYProgress, [0, 1], transformValues)
    : 0;
    
  const x = direction === 'left' || direction === 'right'
    ? useTransform(scrollYProgress, [0, 1], transformValues)
    : 0;
  
  // For fade effect
  const opacity = type === 'fade'
    ? useTransform(scrollYProgress, [0, 0.5], [0.2, 1])
    : 1;
  
  // For scale effect
  const scale = type === 'scale'
    ? useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
    : 1;
    
  // For rotate effect
  const rotate = type === 'rotate'
    ? useTransform(scrollYProgress, [0, 1], [5, 0])
    : 0;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ 
          y: type === 'parallax' ? y : 0,
          x: type === 'parallax' ? x : 0,
          opacity,
          scale,
          rotate,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}