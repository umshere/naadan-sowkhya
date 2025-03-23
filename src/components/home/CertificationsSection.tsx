'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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
  
  // Create a larger pool of certifications for the carousel
  const allCertifications = [...certifications, ...certifications, ...certifications];
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === allCertifications.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? allCertifications.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isVisible) {
        goToNext();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  // Calculate which items to display (current + 2 on each side for larger screens)
  const getVisibleCertifications = () => {
    const result = [];
    const itemCount = allCertifications.length;
    
    // Add current item and surrounding items
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + itemCount) % itemCount;
      result.push({
        cert: allCertifications[index],
        position: i
      });
    }
    
    return result;
  };

  // Handle certification click
  const handleCertificationClick = (cert: Certification, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default navigation
    setSelectedCertification(cert);
  };

  // Close modal
  const closeModal = () => {
    setSelectedCertification(null);
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Professional Certifications
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Credentials that validate expertise and commitment to professional growth
          </p>
        </motion.div>
        
        <div className="relative max-w-7xl mx-auto px-4 overflow-hidden">
          {/* Navigation buttons */}
          <button 
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-green-700 p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Previous certification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-green-700 p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Next certification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          
          {/* Carousel */}
          <div ref={carouselRef} className="relative h-[450px] flex justify-center items-center">
            {getVisibleCertifications().map(({ cert, position }, index) => (
              <motion.a
                key={`${cert.id}-${index}`}
                href={cert.link}
                className="absolute"
                initial={false}
                animate={{
                  x: position * 320,
                  scale: position === 0 ? 1 : 0.8,
                  zIndex: position === 0 ? 10 : 5 - Math.abs(position),
                  opacity: Math.abs(position) > 2 ? 0 : 1 - Math.abs(position) * 0.2
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => handleCertificationClick(cert, e)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={`relative w-[280px] h-[380px] bg-white rounded-xl overflow-hidden
                  ${position === 0 ? 'shadow-2xl border-2 border-green-500' : 'shadow-lg'}
                  transition-all duration-300 hover:shadow-xl cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  <Image
                    src={cert.image}
                    alt="Certification"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                    quality={90}
                  />
                </div>
              </motion.a>
            ))}
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: certifications.length }).map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex % certifications.length 
                    ? "bg-green-600 w-6" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to certification ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Certification Modal */}
      <AnimatePresence>
        {selectedCertification && (
          <motion.div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-white rounded-xl overflow-hidden max-w-[90vw] max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all hover:scale-110"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="relative w-full flex-1 flex items-center justify-center" style={{ minHeight: '300px', maxHeight: '70vh' }}>
                <Image
                  src={selectedCertification.image}
                  alt="Certification"
                  className="object-contain max-h-full"
                  width={800}
                  height={600}
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  sizes="(max-width: 1200px) 90vw, 800px"
                  quality={100}
                />
              </div>
            
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificationsSection;