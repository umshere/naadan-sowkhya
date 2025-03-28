'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLeaf, FaUsers, FaAward, FaMapMarkerAlt } from 'react-icons/fa';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Sample data for the about page
import aboutData from '@/data/about.json';
import galleryData from '@/data/gallery.json';

// Define interface for gallery images
interface GalleryImage {
  id: number;
  src: string;
  alt?: string; // Make alt optional as it might be missing
  category: string;
}

const AboutTabs = () => {
  // Extract data
  const { mission, vision, founder } = aboutData;
  // Filter images by category
  const teamImages: GalleryImage[] = galleryData.images.filter(img => img.category === 'team');
  const manufacturingImages: GalleryImage[] = galleryData.images.filter(img => img.category === 'manufacturing');

  const tabItems = [
    {
      id: 'our-story',
      label: 'Our Story',
      icon: <FaLeaf className="w-4 h-4 mr-2" />,
      content: (
        <div className="space-y-6 py-2">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video w-full overflow-hidden rounded-card mb-6"
          >
            <Image 
              src="/images/gallery/manufacturing-1.jpg"
              alt="Naadan Sowkhya Facility"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4">
                <h3 className="text-white text-lg font-bold">Our Journey</h3>
              </div>
            </div>
          </motion.div>
          
          {/* Removed title as it's not in aboutData */}
          
          {/* Using founder description directly */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-700 leading-relaxed whitespace-pre-line" // Added whitespace-pre-line
          >
            {founder.description}
          </motion.p>

          <div className="bg-tertiary-light rounded-card p-4 border-l-4 border-primary">
            <h3 className="text-xl font-serif font-medium text-primary-dark mb-2">{mission.title}</h3>
            <p className="text-gray-700">{mission.description}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'our-team',
      label: 'Our Team',
      icon: <FaUsers className="w-4 h-4 mr-2" />,
      content: (
        <div className="space-y-6 py-2">
          <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Meet The Team</h2>
          
          <p className="text-gray-700 mb-6">
            Our talented team is dedicated to creating and delivering natural products
            that maintain the highest standards of quality and purity.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {teamImages.map((image: GalleryImage, idx: number) => (
              <motion.div 
                key={image.id} // Use image.id for key
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="aspect-square relative rounded-card overflow-hidden shadow-card"
              >
                <Image 
                  src={image.src} // Use image.src
                  alt={image.alt || "Team member"}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'our-values',
      label: 'Values',
      icon: <FaAward className="w-4 h-4 mr-2" />,
      content: (
        <div className="space-y-6 py-2">
          <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Our Core Values</h2>
          
          <p className="text-gray-700 mb-4">
            At Naadan Sowkhya, we operate with a set of guiding principles that inform everything we do.
          </p>
          
          {/* Removed values.map as 'values' is not in aboutData */}
          
          <div className="bg-cream rounded-card p-4 border border-earth-khaki/20">
            <h3 className="text-xl font-serif font-medium text-earth-terracotta mb-2">{vision.title}</h3>
            <p className="text-gray-700">{vision.description}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'our-facility',
      label: 'Facility',
      icon: <FaMapMarkerAlt className="w-4 h-4 mr-2" />,
      content: (
        <div className="space-y-6 py-2">
          <h2 className="text-2xl font-serif font-bold text-primary-dark mb-4">Our Facility</h2>
          
          <p className="text-gray-700 mb-6">
            Our state-of-the-art production facility combines traditional methods 
            with modern technology to create products that preserve the natural 
            goodness of our ingredients.
          </p>
          
          <div className="space-y-4">
            {manufacturingImages.map((image: GalleryImage, idx: number) => (
              <motion.div 
                key={image.id} // Use image.id for key
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="aspect-video relative rounded-card overflow-hidden shadow-card"
              >
                <Image 
                  src={image.src} // Use image.src
                  alt={image.alt || "Manufacturing facility"}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile view with tabs */}
      <Tabs defaultValue="our-story" className="md:hidden">
        <TabsList className="w-full bg-cream mb-4 overflow-x-auto flex justify-start">
          {tabItems.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="flex items-center whitespace-nowrap data-[state=active]:bg-primary-light data-[state=active]:text-primary-dark"
            >
              {tab.icon}
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {tabItems.map((tab) => (
          <TabsContent 
            key={tab.id} 
            value={tab.id}
            className="pb-20"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Desktop view - all content displayed in full */}
      <div className="hidden md:block space-y-16">
        {tabItems.map((tab) => (
          <section key={tab.id} id={tab.id} className="scroll-mt-32">
            <div className="flex items-center gap-2 mb-6">
              <div className="text-primary-dark">{tab.icon}</div>
              <h2 className="text-3xl font-serif font-bold text-primary-dark">{tab.label}</h2>
            </div>
            <div>
              {tab.content}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AboutTabs;
