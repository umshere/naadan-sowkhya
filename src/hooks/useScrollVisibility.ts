import { useState, useEffect, useRef } from "react";

interface ScrollVisibilityOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export const useScrollVisibility = (
  elementId: string,
  options: ScrollVisibilityOptions = {}
) => {
  // Create state at the top level
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        const isElementVisible = entry.isIntersecting;
        setIsVisible(isElementVisible);

        if (isElementVisible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold: options.threshold || 0.1,
        root: options.root || null,
        rootMargin: options.rootMargin || "0px",
      }
    );

    // Start observing
    observerRef.current.observe(element);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [
    elementId,
    hasBeenVisible,
    options.threshold,
    options.root,
    options.rootMargin,
  ]);

  return {
    isVisible,
    hasBeenVisible,
  };
};
