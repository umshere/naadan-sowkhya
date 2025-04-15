import { useCallback, useMemo, useState } from 'react';
import SectionObserver from '@/components/ui/SectionObserver';

interface SectionLayoutProps {
  children: React.ReactNode;
}

interface VisibilityEntry {
  id: string | null;
  ratio: number;
}

export default function SectionLayout({ children }: SectionLayoutProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const sections = useMemo(() => [
    'hero',
    'guarantee',
    'about',
    'categories',
    'products',
    'testimonials',
    'gallery'
  ], []);

  const handleVisibilityChange = useCallback((visibilityData: Record<string, { isVisible: boolean; ratio: number }>) => {
    // Find section with highest visibility ratio
    const mostVisible = Object.entries(visibilityData).reduce<VisibilityEntry>(
      (prev, [id, data]) => {
        if (!prev.ratio || data.ratio > prev.ratio) {
          return { id, ratio: data.ratio };
        }
        return prev;
      },
      { id: null, ratio: 0 }
    );

    if (mostVisible.id && mostVisible.id !== activeSection) {
      setActiveSection(mostVisible.id);
    }
  }, [activeSection]);

  return (
    <section className="bg-section-bg py-16 md:py-24">
      <SectionObserver 
        sections={sections}
        onVisibilityChange={handleVisibilityChange}
      />
      {children}
      
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-sm">
          Active: {activeSection || 'none'}
        </div>
      )}
    </section>
  );
}