'use client';

import { ReactNode, useEffect, useRef } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'flip-up' | 'flip-down' | 'flip-left' | 'flip-right';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  easing?: string;
  offset?: number;
};

export default function ScrollRevealContainer({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  className = '',
  once = false,
  easing = 'ease-in-out',
  offset = 100,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={elementRef}
      data-aos={animation}
      data-aos-delay={delay}
      data-aos-duration={duration}
      data-aos-easing={easing}
      data-aos-once={once}
      data-aos-offset={offset}
      className={className}
    >
      {children}
    </div>
  );
}