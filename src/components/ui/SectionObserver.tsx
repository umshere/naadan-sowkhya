import { useMemo, useEffect } from 'react';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

interface SectionObserverProps {
  sections: string[];
  onVisibilityChange?: (visibilityData: Record<string, { isVisible: boolean; ratio: number }>) => void;
}

export default function SectionObserver({ sections, onVisibilityChange }: SectionObserverProps) {
  // Memoize sections array to prevent useEffect triggers
  const sectionIds = useMemo(() => sections, [sections]);

  // Configure hook with higher thresholds and debounce
  const { visibilityData } = useSectionVisibility(sectionIds, {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    debounceTime: 250,
    ratioThreshold: 0.05
  });

  // Use useEffect for side effects like callbacks
  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(visibilityData);
    }
  }, [onVisibilityChange, visibilityData]);

  // This component doesn't render anything
  return null;
}