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
  offset = 50,  // Reduced default offset
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

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
        threshold: 0.1,
        rootMargin: '50px 0px -10% 0px' // Trigger earlier and maintain visibility longer
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
  }, [once]);

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