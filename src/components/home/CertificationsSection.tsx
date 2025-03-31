'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Certification {
  id: number;
  image: string;
  link: string;
  title: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
}

const CertificationsSection = ({ certifications }: CertificationsSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const minSwipeDistance = 50;
  const verticalThreshold = 30;
  const touchRef = useRef({ 
    isScrolling: false,
    startTime: 0
  });

  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6 
      }
    }
  };

  // Updated Intersection Observer with lower threshold and rootMargin
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
        rootMargin: '50px 0px'  // Trigger earlier
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = certifications.map((cert) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image(280, 380); // Specify width and height
          img.src = cert.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesPreloaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesPreloaded(true); // Still set to true to allow rendering
      }
    };

    preloadImages();
  }, [certifications]);

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

  // Auto-advance carousel every 5 seconds when visible
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  // Calculate which items to display with improved smoothness
  const getVisibleCertifications = () => {
    if (!imagesPreloaded) return [];
    
    const result = [];
    const itemCount = allCertifications.length;
    
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
    e.preventDefault();
    setSelectedCertification(cert);
  };

  // Close modal
  const closeModal = () => {
    setSelectedCertification(null);
  };

  const handleImageError = (certId: number) => {
    setImageErrors(prev => ({
      ...prev,
      [certId]: true
    }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchRef.current.startTime = Date.now();
    touchRef.current.isScrolling = false;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || touchRef.current.isScrolling) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = Math.abs(touchStartY.current - touchEndY);
    const swipeTime = Date.now() - touchRef.current.startTime;

    // Only handle horizontal swipes if vertical movement is minimal
    if (deltaY < verticalThreshold) {
      const isQuickSwipe = swipeTime < 300;
      const effectiveThreshold = isQuickSwipe ? minSwipeDistance * 0.5 : minSwipeDistance;

      if (Math.abs(deltaX) > effectiveThreshold) {
        if (deltaX > 0) {
          goToNext();
        } else {
          goToPrev();
        }
        e.preventDefault();
      }
    }

    touchStartX.current = 0;
    touchStartY.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;

    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);
    const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current);

    // Detect vertical scrolling
    if (!touchRef.current.isScrolling) {
      touchRef.current.isScrolling = deltaY > deltaX;
    }

    // Prevent default only for horizontal swipes
    if (!touchRef.current.isScrolling && deltaX > deltaY) {
      e.preventDefault();
    }
  };

  return (
    <motion.section 
      ref={sectionRef} 
      className="relative py-24 bg-[var(--natural-light)] overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Subtle background texture with parallax effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-5"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Consistent Section Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.span
            className="inline-block text-sm font-medium tracking-wider text-[var(--tertiary-color)] uppercase mb-2"
            variants={itemVariants}
          >
            Our Credentials
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-[var(--primary-color)] mb-3"
            variants={itemVariants}
          >
            Professional Certifications
          </motion.h2>
          <div className="flex justify-center">
            <div className="h-1 w-16 bg-[var(--primary-color)] rounded-full mb-4 opacity-80"></div>
          </div>
          <motion.p
            className="text-center text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            variants={itemVariants}
          >
            Credentials that validate our expertise and commitment to maintaining the highest quality standards
          </motion.p>
        </motion.div>
        
        <div className="relative max-w-7xl mx-auto px-4 overflow-hidden">
          {/* Navigation buttons */}
          <button 
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[var(--primary-color)] p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Previous certification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[var(--primary-color)] p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Next certification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          
          {/* Carousel */}
          <div 
            ref={carouselRef} 
            className="relative h-[450px] flex justify-center items-center touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="popLayout">
              {getVisibleCertifications().map(({ cert, position }, index) => (
                <motion.a
                  key={`${cert.id}-${position}`}
                  href={cert.link}
                  className="absolute select-none touch-pan-y"
                  initial={{ 
                    x: position * 320,
                    scale: 0.8,
                    opacity: 0 
                  }}
                  animate={{
                    x: position * 320,
                    scale: position === 0 ? 1 : 0.8,
                    zIndex: position === 0 ? 10 : 5 - Math.abs(position),
                    opacity: Math.abs(position) > 2 ? 0 : 1 - Math.abs(position) * 0.2
                  }}
                  exit={{ 
                    scale: 0.8,
                    opacity: 0 
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                    mass: 0.5,
                    duration: 0.5
                  }}
                  onClick={(e) => handleCertificationClick(cert, e)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    willChange: 'transform, opacity'
                  }}
                >
                  <motion.div 
                    className={`relative w-[280px] h-[380px] bg-white rounded-xl overflow-hidden
                      ${position === 0 ? 'shadow-2xl border-2 border-[var(--primary-color)]' : 'shadow-lg'}
                      transition-all duration-300 hover:shadow-xl cursor-pointer`}
                    layoutId={`cert-${cert.id}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <Image
                      src={imageErrors[cert.id] ? '/images/placeholder.jpg' : cert.image}
                      alt={`${cert.title} Certification`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 300px"
                      quality={90}
                      priority={Math.abs(position) <= 1}
                      loading={Math.abs(position) <= 1 ? "eager" : "lazy"}
                      onError={() => handleImageError(cert.id)}
                    />
                  </motion.div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: certifications.length }).map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex % certifications.length 
                    ? "bg-[var(--primary-color)] w-6" 
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
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 touch-pan-y"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-white rounded-xl overflow-hidden max-w-[90vw] max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }
              }}
              exit={{ 
                scale: 0.9, 
                opacity: 0,
                transition: { duration: 0.2 }
              }}
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
    </motion.section>
  );
};

export default CertificationsSection;