'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Certification {
  id: number;
  image: string;
  link: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Add more certifications to match the production site
  const allCertifications = [
    ...certifications,
    ...certifications,
    ...certifications.slice(0, 1)
  ].slice(0, 3); // Limit to 3 certifications as shown in the screenshot

  return (
    <section 
      ref={sectionRef} 
      className="py-16 bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(42, 109, 60, 0.02) 0%, rgba(42, 109, 60, 0) 70%)',
      }}
    >
      <div className="container mx-auto px-4">
        <h2 
          className={`section-title transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Certifications
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-6 max-w-6xl mx-auto">
          {allCertifications.map((certification, index) => (
            <a 
              key={`${certification.id}-${index}`}
              href={certification.link}
              className={`block transform transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-[300px] h-[400px] bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
                <Image
                  src={certification.image}
                  alt="Certification"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 300px"
                  quality={100}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;