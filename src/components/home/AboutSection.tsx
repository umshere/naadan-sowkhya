'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AboutSectionProps {
  title: string;            // e.g. "Natural Ayurvedic Excellence"
  description: string[];    // Paragraphs of text
  buttonText: string;       // e.g. "Read More"
  buttonLink: string;       // e.g. "/about"
  images: string[];         // Array of image URLs
}

const AboutSection = ({
  title,
  description,
  buttonText,
  buttonLink,
  images,
}: AboutSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0.2, 0.8], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="relative overflow-hidden py-20 lg:py-32"
    >
      {/* Subtle background texture */}
      <motion.div 
        className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-5"
        style={{ opacity }}
      />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block text-sm font-semibold tracking-wider text-[var(--tertiary-color)] uppercase mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            About Us
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-dark)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h2>
          <motion.div 
            className="mx-auto w-24 h-1 bg-[var(--tertiary-color)]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            ref={textRef}
            style={{ y: textY }}
            className="order-2 lg:order-1"
          >
            {/* Promise Box */}
            <motion.div 
              className="bg-[var(--primary-light)] rounded-xl p-8 mb-10 border-l-4 border-[var(--primary-color)] shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-serif text-2xl text-[var(--primary-color)] mb-4">
                Our Promise
              </h3>
              <p className="text-lg text-[var(--primary-dark)] leading-relaxed">
                {description[0]}
              </p>
            </motion.div>

            {/* Benefits */}
            <motion.div 
              className="space-y-8 mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              {[
                { title: "100% Natural", desc: "Free from preservatives, chemicals, and artificial ingredients." },
                { title: "Traditional Methods", desc: "Crafted with ancient Ayurvedic principles and techniques." }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                  }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--tertiary-color)] bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-[var(--primary-color)] mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-[var(--text-dark)] leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Description */}
            <motion.div 
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              {description.slice(1).map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                  }}
                  className="text-[var(--text-dark)] leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                href={buttonLink}
                className="inline-flex items-center px-8 py-4 bg-[var(--primary-color)] text-white rounded-lg
                         font-semibold hover:bg-[var(--primary-color)]/90 transition-all duration-300 
                         hover:shadow-lg group"
              >
                <span>{buttonText}</span>
                <svg
                  className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Image Gallery */}
          <motion.div
            ref={imageRef}
            style={{ scale: imageScale }}
            className="order-1 lg:order-2"
          >
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {images.map((image, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: i === currentImageIndex ? 1 : 0,
                    scale: i === currentImageIndex ? 1 : 1.1
                  }}
                  transition={{ duration: 0.7 }}
                >
                  <OptimizedImage
                    src={image}
                    alt={`Naadan Sowkhya - Image ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}

              {/* Image Navigation Dots */}
              <motion.div 
                className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 
                      ${i === currentImageIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/75'
                      }`}
                    aria-label={`Switch to image ${i + 1}`}
                  />
                ))}
              </motion.div>
            </div>

            {/* Quality Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-[var(--primary-color)] text-white 
                       rounded-full h-24 w-24 flex items-center justify-center shadow-lg z-20"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.6
              }}
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-wider">Pure</div>
                <div className="font-serif font-bold text-lg">Ayurveda</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
