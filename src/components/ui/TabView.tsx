'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface TabViewProps {
  tabs: Tab[];
  defaultTabId?: string;
  variant?: 'underline' | 'pills' | 'bubbles';
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  enableSwipe?: boolean;
  onChange?: (tabId: string) => void;
}

export default function TabView({
  tabs,
  defaultTabId,
  variant = 'underline',
  className = '',
  tabClassName = '',
  contentClassName = '',
  enableSwipe = true,
  onChange,
}: TabViewProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0]?.id || '');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Set initial active tab
  useEffect(() => {
    if (defaultTabId && tabs.some(tab => tab.id === defaultTabId)) {
      setActiveTabId(defaultTabId);
    }
  }, [defaultTabId, tabs]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    if (onChange) onChange(tabId);
  };

  // Get current tab index
  const currentTabIndex = tabs.findIndex(tab => tab.id === activeTabId);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableSwipe) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableSwipe) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!enableSwipe || touchStart === null || touchEnd === null) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance && currentTabIndex < tabs.length - 1) {
      // Swiped left, go to next tab
      handleTabChange(tabs[currentTabIndex + 1].id);
    } else if (distance < -minSwipeDistance && currentTabIndex > 0) {
      // Swiped right, go to previous tab
      handleTabChange(tabs[currentTabIndex - 1].id);
    }
  };

  // Variant-specific styles
  const getTabStyles = () => {
    switch (variant) {
      case 'pills':
        return 'flex items-center px-4 py-2 rounded-full transition-colors duration-200';
      case 'bubbles':
        return 'flex items-center px-4 py-2 rounded-2xl transition-colors duration-200';
      case 'underline':
      default:
        return 'flex items-center px-4 py-2 border-b-2 transition-colors duration-200 border-transparent';
    }
  };

  const getActiveTabStyles = () => {
    switch (variant) {
      case 'pills':
        return 'bg-primary text-white shadow-sm';
      case 'bubbles':
        return 'bg-primary-light text-primary-dark font-medium';
      case 'underline':
      default:
        return 'border-primary text-primary-dark font-medium';
    }
  };

  const getInactiveTabStyles = () => {
    switch (variant) {
      case 'pills':
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
      case 'bubbles':
        return 'bg-gray-50 text-gray-700 hover:bg-gray-100';
      case 'underline':
      default:
        return 'text-gray-600 hover:text-gray-900 hover:border-gray-300';
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Navigation */}
      <div className="relative border-b border-gray-200 dark:border-gray-800">
        <div className="flex overflow-x-auto hide-scrollbar mb-px">
          <div className="flex space-x-1 sm:space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  getTabStyles(), 
                  activeTabId === tab.id ? getActiveTabStyles() : getInactiveTabStyles(),
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  tabClassName
                )}
                aria-selected={activeTabId === tab.id}
                role="tab"
              >
                {tab.icon && <span className="mr-2">{tab.icon}</span>}
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div 
        ref={contentRef}
        className={cn('relative pt-4', contentClassName)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          {tabs.map((tab) => (
            activeTabId === tab.id && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {tab.content}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Indicators for Mobile */}
      {tabs.length > 1 && (
        <div className="flex justify-center space-x-1 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-200',
                activeTabId === tab.id 
                  ? 'bg-primary scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              onClick={() => handleTabChange(tab.id)}
              aria-label={`Go to ${tab.label} tab`}
            />
          ))}
        </div>
      )}

      {/* Helper styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}