'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Award, Leaf } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/Carousel';
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
      className="relative pt-16 md:pt-24 pb-8 md:pb-12 bg-section-bg overflow-hidden"
    >
      {/* Section Header - styled like ProductCategories */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
      >
        <div className="flex justify-center">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs md:text-sm font-semibold px-5 py-1 rounded-full tracking-wide mb-3 shadow-sm">
            ABOUT US
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-[var(--primary-dark)]">
          {title}
        </h2>
        <div className="flex justify-center mt-2">
          <span className="block w-16 h-1 bg-[var(--primary-dark)] rounded-full"></span>
        </div>
        {description?.[0] && (
          <p className="mt-4 text-center text-base md:text-lg text-[var(--text-dark)] mx-auto max-w-2xl">
            {description[0]}
          </p>
        )}
      </motion.div>
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
                  {description[1]}
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
            {description.slice(2).map((paragraph, index) => (
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
        {images && images.length > 0 && (
          <div className="flex-1 relative z-10 flex items-center justify-center min-h-[250px] w-full">
            <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <CarouselContent>
                {images.map((img, idx) => (
                  <CarouselItem key={idx} className="flex items-center justify-center h-80 md:h-96">
                    <OptimizedImage
                      src={img}
                      alt={title}
                      fill
                      className="object-cover rounded-lg shadow-card"
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none"></div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
