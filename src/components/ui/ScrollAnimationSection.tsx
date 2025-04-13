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
  const getTransformValues = (dir: 'up' | 'down' | 'left' | 'right') => {
    const transformDistance = 100 * intensity;
    switch (dir) {
      case 'up': return [transformDistance, 0];
      case 'down': return [-transformDistance, 0];
      case 'left': return [transformDistance, 0]; // Assuming left means moving from right-to-left on screen
      case 'right': return [-transformDistance, 0]; // Assuming right means moving from left-to-right on screen
      default: return [0, 0];
    }
  };

  // Define all transforms unconditionally
  const yTransform = useTransform(scrollYProgress, [0, 1], getTransformValues(direction));
  const xTransform = useTransform(scrollYProgress, [0, 1], getTransformValues(direction));
  const opacityTransform = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotateTransform = useTransform(scrollYProgress, [0, 1], [5, 0]);

  // Apply transforms conditionally in the style prop
  const motionStyle = {
    y: type === 'parallax' && (direction === 'up' || direction === 'down') ? yTransform : 0,
    x: type === 'parallax' && (direction === 'left' || direction === 'right') ? xTransform : 0,
    opacity: type === 'fade' ? opacityTransform : 1,
    scale: type === 'scale' ? scaleTransform : 1,
    rotate: type === 'rotate' ? rotateTransform : 0,
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={motionStyle}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
