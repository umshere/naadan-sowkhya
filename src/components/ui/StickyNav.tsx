'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';
import { cn } from '@/lib/utils';
import { FaLeaf, FaStar, FaImage, FaInfoCircle, FaAward, FaHome, FaCheck } from 'react-icons/fa';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";

interface Section {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface StickyNavProps {
  sections: Section[];
}

export default function StickyNav({ sections: propsSections }: StickyNavProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState('products');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Enhanced sections with icons - make sure we have all icons from HomePageTabs
  const sections = useMemo(() => {
    const iconMap: Record<string, React.ReactNode> = {
      'products': <FaLeaf className="w-4 h-4" />,
      'about': <FaInfoCircle className="w-4 h-4" />,
      'gallery': <FaImage className="w-4 h-4" />,
      'reviews': <FaStar className="w-4 h-4" />,
      'testimonials': <FaStar className="w-4 h-4" />, // Alternative name for reviews section
      'certifications': <FaAward className="w-4 h-4" />,
      'hero': <FaHome className="w-4 h-4" />,
      'guarantee': <FaCheck className="w-4 h-4" />,
      'categories': <FaLeaf className="w-4 h-4" />,
    };
    
    return propsSections.map(section => ({
      ...section,
      icon: section.icon || iconMap[section.id] || <FaLeaf className="w-4 h-4" />
    }));
  }, [propsSections]);
  
  // Extract section IDs for the visibility hook
  const sectionIds = useMemo(() => sections.map(section => section.id), [sections]);
  
  const { activeSection, isHeroVisible } = useSectionVisibility(sectionIds);
  
  // Sync the active section from visibility hook with our active tab
  useEffect(() => {
    if (activeSection && activeSection !== 'hero') {
      setActiveTab(activeSection);
    }
  }, [activeSection]);
  
  // Show/hide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !isHeroVisible) {
        setShowMobileMenu(true);
      } else {
        setShowMobileMenu(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeroVisible]);
  
  const scrollToSection = (sectionId: string): void => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Add offset for the sticky header
      const headerHeight = 60; // Approximate header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsExpanded(false);
    }
  };
  
  // Tab indicator animation
  const tabIndicatorVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
  };
  
  // Don't render anything if we're in the hero section
  if (isHeroVisible) return <></>;
  
  // Filter out sections we don't want to show in the tab navigation
  // Always skip the hero section, and optionally skip other utility sections
  const navigationSections = sections.filter(section => section.id !== 'hero');
  
  return (
    <>
      {/* Mobile Navigation Only - Tab Style */}
      <div className={cn(
        "md:hidden fixed z-50 w-full transition-transform duration-300 bg-white/95 shadow-md backdrop-blur-sm",
        showMobileMenu ? "top-0" : "-top-16", // Hide above the viewport when not shown
      )}>
        <Tabs 
          value={activeTab}
          onValueChange={(value) => scrollToSection(value)}
          className="w-full"
        >
          <TabsList 
            className="w-full bg-cream mb-0 flex justify-between shadow-sm overflow-x-auto no-scrollbar"
          >
            {navigationSections.map((section) => (
              <TabsTrigger 
                key={section.id} 
                value={section.id}
                className="flex items-center relative px-3 py-2 flex-1 justify-center text-sm transition-all data-[state=active]:font-medium"
              >
                <span className="flex items-center">
                  <span className="mr-1.5">{section.icon}</span>
                  <span className="whitespace-nowrap text-xs">{section.label}</span>
                </span>
                
                {/* Active indicator dot */}
                {activeTab === section.id && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-0.5 left-0 right-0 mx-auto w-1.5 h-1.5 bg-[var(--primary-color)] rounded-full"
                    initial="initial"
                    animate="animate"
                    variants={tabIndicatorVariants}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {/* Mobile Floating Button (when at top of page) */}
      <div className={cn(
        "fixed bottom-24 right-4 z-50 md:hidden",
        showMobileMenu ? "hidden" : "block"
      )}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
          aria-label="Toggle navigation menu"
        >
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg overflow-hidden min-w-[160px]"
            >
              <nav className="py-2">
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full px-6 py-2 text-left text-sm transition-colors ${
                      activeTab === section.id
                        ? 'bg-gray-100 text-gray-900 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="mr-2">{section.icon}</span>
                      <span>{section.label}</span>
                    </span>
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
