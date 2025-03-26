'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

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
  offset = 50,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-aos-animate', '');
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.removeAttribute('data-aos-animate');
          }
        });
      },
      {
        threshold: isMobile ? 0.05 : 0.1, // Lower threshold on mobile
        rootMargin: isMobile ? '30px 0px -5% 0px' : '50px 0px -10% 0px' // Adjusted margins for mobile
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [once, isMobile]);

  return (
    <div
      ref={elementRef}
      data-aos={animation}
      data-aos-delay={delay}
      data-aos-duration={duration}
      data-aos-easing={easing}
      data-aos-once={once}
      data-aos-offset={offset}
      className={`scroll-momentum ${className}`}
    >
      {children}
    </div>
  );
}