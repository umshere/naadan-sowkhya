import type { ReactNode } from "react";

// UI Component Types
export interface ScrollRevealProps {
  children: ReactNode;
  animation?:
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "zoom-in"
    | "zoom-out"
    | "flip-up"
    | "flip-down"
    | "flip-left"
    | "flip-right";
  duration?: number;
  offset?: number;
  className?: string;
}

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  className?: string;
}

export interface SectionWrapperProps {
  id: string;
  children: ReactNode;
}
