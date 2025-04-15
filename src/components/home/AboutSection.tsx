'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Award, Leaf } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

interface AboutSectionProps {
  title: string;
  description: string[];
  buttonText: string;
  buttonLink: string;
  images: string[];
}

const AboutSection = ({
  title,
  description,
  buttonText,
  buttonLink,
  images,
}: AboutSectionProps) => {
  console.log('AboutSection title:', title);
  console.log('AboutSection description:', description);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]); 
  const imageScale = useTransform(scrollYProgress, [0.1, 0.7], [0.95, 1]); 
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.03, 0.03, 0]); 

  // Image slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6 
      }
    },
  };
  
  const promiseCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: 0.2,
        duration: 0.6 
      }
    },
  };

  const benefitItemVariants = {
     hidden: { opacity: 0, x: -20 },
     visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-section-bg overflow-hidden"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <motion.div
          className="flex-1 z-10 shadow-card rounded-lg bg-white p-8"
          style={{ y: textY }}
        >
          {/* Promise Box - Matching ProductGuarantee card style */}
          <motion.div variants={promiseCardVariants}>
            <Card 
              className="backdrop-blur-sm overflow-hidden relative rounded-card border-border/50 shadow-card"
              style={{
                background: "radial-gradient(circle, rgba(76, 175, 80, 0.05) 0%, rgba(255,255,255,0) 70%)"
              }}
            >
              {/* Decorative accents like in ProductGuarantee */}
              <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full"
                style={{ background: "rgba(76, 175, 80, 0.1)", opacity: 0.3 }}></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 -ml-8 -mb-8 rounded-full"
                style={{ background: "rgba(76, 175, 80, 0.1)", opacity: 0.2 }}></div>

              {/* Badge-like accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--tertiary-color)]"></div>
                  
              <CardHeader className="pt-5 md:pt-6 pb-2 md:pb-3 relative z-10">
                <CardTitle className="font-serif text-xl md:text-xl text-[var(--primary-dark)] flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="p-2 rounded-full shadow-sm mr-3"
                  >
                    <Award className="w-5 h-5 text-[var(--primary-color)]" />
                  </motion.div>
                  Our Promise
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-5 md:pb-6 relative z-10">
                <p className="text-[var(--text-dark)] leading-relaxed text-sm md:text-base">
                  {description[0]}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits - Enhanced with ProductGuarantee-style cards */}
          <motion.div
            className="space-y-5 mb-8"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {[
              { icon: Leaf, title: "100% Natural", desc: "Free from preservatives, chemicals, and artificial ingredients." },
              { icon: Award, title: "Traditional Methods", desc: "Crafted with ancient Ayurvedic principles and techniques." }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={benefitItemVariants}
              >
                <Card 
                  className="backdrop-blur-sm rounded-card border-border/50 overflow-hidden relative shadow-card"
                >
                  {/* Badge-like accent with different colors */}
                  <div className="absolute top-0 left-0 w-full h-1" 
                    style={{ background: index === 0 ? "rgba(139, 195, 74, 0.5)" : "rgba(255, 193, 7, 0.5)" }}></div>
                    
                  <CardContent className="p-4 md:p-5 flex items-start space-x-4">
                    <div className="flex-shrink-0 p-2 rounded-full shadow-sm">
                      <benefit.icon className="w-5 h-5 md:w-6 md:h-6 text-[var(--primary-color)]" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-serif font-semibold text-[var(--primary-dark)] mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm md:text-base text-[var(--text-dark)] leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Description */}
          <motion.div
            className="space-y-4 prose prose-sm md:prose-base max-w-none"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {description.slice(1).map((paragraph, index) => (
              <motion.p 
                key={index} 
                variants={itemVariants}
                className="text-[var(--text-dark)] leading-relaxed text-sm md:text-base"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="mt-8"
            variants={itemVariants}
          >
            <Link href={buttonLink} passHref>
              <Button
                size="lg"
                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white group rounded-full px-6 py-2.5 text-sm md:text-base"
                aria-label={buttonText}
              >
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Image Carousel */}
        <motion.div
          className="flex-1 relative z-10 flex items-center justify-center min-h-[320px]"
          style={{ scale: imageScale }}
        >
          {images && images.length > 0 && (
            <>
              <motion.div
                className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-card"
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <OptimizedImage
                  src={images[currentImageIndex]}
                  alt={title}
                  fill
                  className="object-cover"
                  priority={currentImageIndex === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                />
                {/* Simplified gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5"></div>
              </motion.div>
              {/* Image Navigation Dots */}
              <motion.div
                className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2.5 z-20"
              >
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`h-2.5 w-2.5 rounded-full border border-white bg-white/80 ${
                      i === currentImageIndex ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(i)}
                    aria-label={`Show image ${i + 1}`}
                  />
                ))}
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
