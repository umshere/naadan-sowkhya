'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

interface Section {
  id: string;
  label: string;
}

interface MobileSectionNavProps {
  sections: Section[];
}

interface RenderMetrics {
  count: number;
  lastRenderTime: number;
}

export default function MobileSectionNav({ sections }: MobileSectionNavProps): React.ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const metricsRef = useRef<RenderMetrics>({
    count: 0,
    lastRenderTime: performance.now()
  });
  
  // Extract section IDs for the visibility hook
  const sectionIds = useMemo(() => sections.map(section => section.id), [sections]);
  
  const { activeSection, isHeroVisible, visibleSections } = useSectionVisibility(sectionIds);
  
  // Performance monitoring - only log excessive re-renders
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const now = performance.now();
      const timeBetweenRenders = now - metricsRef.current.lastRenderTime;
      
      if (metricsRef.current.count % 10 === 0) { // Log every 10th render
        console.log(`MobileSectionNav render #${metricsRef.current.count}`, {
          activeSection,
          visibleSections,
          isHeroVisible,
          timeBetweenRenders
        });
      }
      // Warn about rapid re-renders
      if (timeBetweenRenders < 16) { // Less than 60fps
        console.warn('Rapid re-renders detected in MobileSectionNav', {
          timeBetweenRenders,
          renderCount: metricsRef.current.count
        });
      }
      metricsRef.current.count++;
      metricsRef.current.lastRenderTime = now;
    }
  }, [activeSection, visibleSections.length, isHeroVisible]); // Only monitor important state changes
  
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsExpanded(false);
    }
  };
  
  if (isHeroVisible) return <></>;
  
  return (
    <div className="fixed bottom-24 right-4 z-50 md:hidden">
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center relative z-20"
          aria-label="Toggle navigation menu"
          aria-expanded={isExpanded}
        >
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </button>
        
        {/* Navigation Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg overflow-hidden min-w-[160px]"
            >
              <nav className="py-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full px-6 py-2 text-left text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    aria-current={activeSection === section.id ? 'true' : 'false'}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Section Indicator Dots */}
        <div 
          className={`absolute right-full mr-2 top-1/2 -translate-y-1/2 space-y-2 ${
            isExpanded ? 'hidden' : 'block'
          }`}
          aria-hidden="true"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block w-2 h-2 rounded-full transition-all ${
                activeSection === section.id
                  ? 'bg-gray-900 scale-125'
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to ${section.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}