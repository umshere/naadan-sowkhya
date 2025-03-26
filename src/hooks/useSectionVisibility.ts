import { useState, useEffect, useRef } from 'react';

interface SectionVisibility {
  isVisible: boolean;
  ratio: number;
}

interface SectionVisibilityOptions {
  threshold?: number[];
  rootMargin?: string;
  debounceTime?: number;
  ratioThreshold?: number;
}

interface SectionVisibilityReturn {
  activeSection: string | null;
  isHeroVisible: boolean;
  visibleSections: string[];
  visibilityData: Record<string, SectionVisibility>;
}

export const useSectionVisibility = (
  sectionIds: string[],
  options: SectionVisibilityOptions = {}
): SectionVisibilityReturn => {
  const [visibilityData, setVisibilityData] = useState<Record<string, SectionVisibility>>({});
  
  const configRef = useRef({
    threshold: [0, 0.5],
    rootMargin: '0px',
    debounceTime: 250,
    ratioThreshold: 0.05,
    ...options
  });

  const observersRef = useRef(new Map<string, IntersectionObserver>());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stateRef = useRef(visibilityData);

  useEffect(() => {
    if (!sectionIds?.length) return;

    const cleanup = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      observersRef.current.forEach(observer => observer.disconnect());
      observersRef.current.clear();
    };

    const hasSignificantChange = (oldState: SectionVisibility, newState: SectionVisibility) => {
      if (oldState.isVisible !== newState.isVisible) return true;
      return Math.abs(oldState.ratio - newState.ratio) > configRef.current.ratioThreshold;
    };

    const updateState = (newState: Record<string, SectionVisibility>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        setVisibilityData(newState);
        stateRef.current = newState;
      }, configRef.current.debounceTime);
    };

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            const newVisibility: SectionVisibility = {
              isVisible: entry.isIntersecting && entry.intersectionRatio >= 0.5,
              ratio: entry.intersectionRatio
            };

            const currentVisibility = stateRef.current[id];
            
            if (!currentVisibility || hasSignificantChange(currentVisibility, newVisibility)) {
              const newState = {
                ...stateRef.current,
                [id]: newVisibility
              };
              updateState(newState);
            }
          });
        },
        {
          threshold: configRef.current.threshold,
          rootMargin: configRef.current.rootMargin
        }
      );

      observer.observe(element);
      observersRef.current.set(id, observer);
    });

    return cleanup;
  }, [sectionIds]);

  // Compute derived state
  const visibleSections = Object.entries(visibilityData)
    .filter(([_, data]) => data.isVisible)
    .map(([id]) => id);

  const activeSection = Object.entries(visibilityData).reduce<string | null>(
    (active, [id, data]) => {
      if (!active || (data.isVisible && data.ratio > (visibilityData[active]?.ratio || 0))) {
        return id;
      }
      return active;
    },
    null
  );

  const isHeroVisible = visibilityData['hero']?.isVisible || false;

  return {
    activeSection,
    isHeroVisible,
    visibleSections,
    visibilityData
  };
};
