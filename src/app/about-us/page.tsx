'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Import data
import aboutData from '@/data/about.json';

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const valueCardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="pt-24 pb-16" ref={pageRef}>
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Breadcrumbs */}
        <motion.div 
          className="mb-8 text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Link href="/" className="text-gray-500 hover:text-primary-color">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-primary-color">About Us</span>
        </motion.div>
        
        {/* Page Header */}
        <motion.div 
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl font-bold text-primary-color mb-4"
            variants={itemVariants}
          >
            About Us
          </motion.h1>
          <motion.p 
            className="text-gray-600 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Learn more about NAADAN SOWKHYA, our mission, vision, and the people behind our natural products.
          </motion.p>
        </motion.div>
        
        {/* Mission & Vision */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Mission */}
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-md"
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <h2 className="text-2xl font-bold text-primary-color mb-4">{aboutData.mission.title}</h2>
            <p className="text-gray-700">{aboutData.mission.description}</p>
          </motion.div>
          
          {/* Vision */}
          <motion.div 
            className="bg-white p-8 rounded-lg shadow-md"
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <h2 className="text-2xl font-bold text-primary-color mb-4">{aboutData.vision.title}</h2>
            <p className="text-gray-700">{aboutData.vision.description}</p>
          </motion.div>
        </motion.div>
        
        {/* Founder */}
        <motion.div 
          className="bg-gray-50 p-8 rounded-lg mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="relative h-[400px] rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={aboutData.founder.image}
                alt={aboutData.founder.name}
                fill
                className="object-cover transform transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl font-bold text-primary-color mb-2"
                variants={itemVariants}
              >
                About Founder
              </motion.h2>
              <motion.h3 
                className="text-2xl font-semibold text-secondary-color mb-4"
                variants={itemVariants}
              >
                {aboutData.founder.name}
              </motion.h3>
              <motion.div 
                className="text-gray-700 space-y-4"
                variants={containerVariants}
              >
                {aboutData.founder.description.split('\n\n').map((paragraph, index) => (
                  <motion.p 
                    key={index}
                    variants={itemVariants}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Values */}
        <motion.div 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center text-primary-color mb-8"
            variants={itemVariants}
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "M5 13l4 4L19 7",
                title: "Quality",
                description: "We prioritize quality and purity in everything we offer."
              },
              {
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Sustainability",
                description: "We are committed to environmental stewardship and sustainable practices."
              },
              {
                icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                title: "Community",
                description: "We're a community united by a shared commitment to holistic wellness."
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Integrity",
                description: "We prioritize transparency, integrity, and sustainability in every step."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
                variants={valueCardVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                custom={index}
              >
                <motion.div 
                  className="w-16 h-16 bg-primary-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-semibold text-secondary-color mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div 
          className="bg-primary-color text-white p-8 rounded-lg text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Join us in embracing a lifestyle that celebrates the harmony between humanity and nature
          </motion.h2>
          <motion.p 
            className="mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Together, let's make a positive impact. Welcome to NAADAN SOWKHYA.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link 
              href="/product_category/natural-hair-care" 
              className="btn bg-white text-primary-color hover:bg-gray-100 inline-block px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Explore Our Products
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}