'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge'; 
import { Dialog, DialogContent } from '@/components/ui/Dialog'; // Assuming Badge component is in a separate file

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

interface GallerySectionProps {
  images: GalleryImage[];
  title: string;
}

const GallerySection = ({ images, title }: GallerySectionProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Update displayed images when prop changes
  useEffect(() => {
    setDisplayedImages(images);
    setHoveredImage(null); // Reset hover state
    if (selectedImage) {
      // If an image was selected, find it in new array or close lightbox
      const stillExists = images.find(img => img.id === selectedImage.id);
      if (!stillExists) {
        closeLightbox();
      }
    }
  }, [images]);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const minSwipeDistance = 50;
  const verticalThreshold = 30;

  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const touchRef = useRef({ isVerticalScroll: false });
  const [isScrolling, setIsScrolling] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setDialogOpen(true);
  };

  const closeLightbox = () => {
    setDialogOpen(false);
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setSelectedImage(images[prevIndex]);
  };

  const goToNext = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(images[nextIndex]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now()
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current.time) return;
    const deltaX = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartRef.current.y);
    
    if (!touchRef.current.isVerticalScroll) {
      touchRef.current.isVerticalScroll = deltaY > deltaX;
      if (deltaX > deltaY && deltaX > 10) {
        setIsScrolling(true);
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current.time || touchRef.current.isVerticalScroll) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartRef.current.x - touchEndX;
    const deltaY = Math.abs(touchStartRef.current.y - touchEndY);
    
    // Reset scrolling state after a short delay
    setTimeout(() => setIsScrolling(false), 50);

    // Only handle horizontal swipes if vertical movement is minimal
    if (deltaY < verticalThreshold) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
        e.preventDefault();
      }
    }

    // Reset touch tracking
    touchStartRef.current = { x: 0, y: 0, time: 0 };
    touchStartX.current = 0;
    touchStartY.current = 0;
  };

  return (
    <motion.section 
      ref={sectionRef} 
      className="py-0 overflow-hidden relative"
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
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="flex justify-center mb-2 md:mb-3">
            <Badge variant="outline" className="text-sm font-medium tracking-wider uppercase text-[var(--subheading-color)]">
              Visual Journey
            </Badge>
          </div>
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-2 md:mb-3 text-[var(--primary-color)] relative"
            variants={itemVariants}
          >
            {title}
            <span className="block mx-auto mt-2 w-12 h-1 rounded-full bg-[var(--primary-color)]"></span>
          </motion.h2>
          <motion.p
            className="text-center text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            variants={itemVariants}
          >
            Explore our facility and products through our carefully curated image gallery
          </motion.p>
        </motion.div>

        {/* Thumbnail Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={itemVariants}
        >
          {displayedImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl 
                        transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(image)}
              aria-label={`View ${image.alt}`}
            >
              <motion.div
                className="relative h-64 w-full"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-50 transition-all duration-200"
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredImage === image.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-white text-center p-4">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/20 backdrop-blur-sm rounded-full p-3 mb-3 inline-block"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </motion.div>
                    <motion.p
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm font-medium text-white"
                    >
                      {image.alt}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setSelectedImage(null); }}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0 bg-transparent shadow-none border-none flex flex-col items-center justify-center">
          {selectedImage && (
            <div className="relative w-full h-[80vh] select-none">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
                draggable={false}
              />
              {/* Image Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-center bg-gray-900/60 p-3 rounded-lg">
                <span className="text-white">{selectedImage.alt}</span>
              </div>
              {/* Navigation Buttons */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8">
                <button
                  onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                  className="p-4 md:p-3 rounded-full bg-gray-900/20 hover:bg-gray-900/30 focus:outline-none transition-all hover:scale-110"
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 md:h-6 md:w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-8">
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  className="p-4 md:p-3 rounded-full bg-gray-900/20 hover:bg-gray-900/30 focus:outline-none transition-all hover:scale-110"
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 md:h-6 md:w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.section>
  );
};

export default GallerySection;
