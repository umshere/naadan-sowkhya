'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Image as ImageIcon } from 'lucide-react';

// Define interface for gallery images
interface GalleryImage {
  id: number;
  src: string;
  alt?: string;
  category: string;
}

interface FacilityGalleryProps {
  images: GalleryImage[];
  showHeader?: boolean;
}

const FacilityGallery = ({ images, showHeader = true }: FacilityGalleryProps) => {
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
  
  return (
    <motion.div 
      className="relative space-y-8"
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

      {showHeader && (
        <motion.div className="text-center mb-12 relative z-10" variants={itemVariants}>
          <motion.span
            className="inline-block text-sm font-medium tracking-wider text-[var(--tertiary-color)] uppercase mb-2"
            variants={itemVariants}
          >
            Explore Our Facility
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-[var(--primary-color)] mb-3"
            variants={itemVariants}
          >
            Where Nature Meets Innovation
          </motion.h2>
          <div className="flex justify-center">
            <div className="h-1 w-16 bg-[var(--primary-color)] rounded-full mb-4 opacity-80"></div>
          </div>
          <motion.p
            className="text-center text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
            variants={itemVariants}
          >
            Our state-of-the-art production facility combines traditional methods 
            with modern technology to create products that preserve the natural 
            goodness of our ingredients.
          </motion.p>
        </motion.div>
      )}

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        variants={itemVariants}
      >
        {images.map((image, idx) => (
          <motion.div
            key={image.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group"
          >
            <Card 
              className="overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={image.src}
                    alt={image.alt || "Facility image"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-4 w-full">
                      {image.alt && (
                        <p className="text-white font-medium">{image.alt}</p>
                      )}
                    </div>
                  </div>
                </div>
                {image.alt && (
                  <div className="p-4">
                    <p className="font-medium text-gray-700">{image.alt}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="flex justify-center mt-8 relative z-10">
        <Button 
          variant="outline" 
          className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Visit Our Facility
        </Button>
      </div>
    </motion.div>
  );
};

export default FacilityGallery;
