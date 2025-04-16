'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLeaf, FaUsers, FaAward, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from "@/components/ui/Card";

// Import components
import CEOProfile from '@/components/about/ceo/CEOProfile';
import FacilityGallery from '@/components/about/FacilityGallery';

// Sample data for the about page
import aboutData from '@/data/about.json';
import galleryData from '@/data/gallery.json';

// Define interface for gallery images
interface GalleryImage {
  id: number;
  src: string;
  alt?: string;
  category: string;
}

const AboutTabs = () => {
  // Extract data
  const { mission, vision, founder } = aboutData;
  // Filter images by category
  const teamImages: GalleryImage[] = galleryData.images.filter(img => img.category === 'team');
  const manufacturingImages: GalleryImage[] = galleryData.images.filter(img => 
    img.category === 'manufacturing' || img.category === 'product-process' || img.category === 'product-display'
  );

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
            className="relative aspect-video w-full overflow-hidden rounded-lg mb-6 shadow-md"
          >
            <Image 
              src="/images/gallery/manufacturing-1.jpg"
              alt="Naadan Sowkhya Facility"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6">
                <Badge variant="outline" className="bg-white/20 text-white border-white/40 backdrop-blur-sm mb-2">Our Journey</Badge>
                <h3 className="text-white text-xl font-bold font-serif">Crafting Tradition for Modern Life</h3>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="prose prose-green max-w-none">
              {founder.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <Card className="border-l-4 border-primary overflow-hidden mt-8">
            <CardContent className="p-6 bg-tertiary-light/40">
              <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary">Our Mission</Badge>
              <h3 className="text-xl font-serif font-medium text-primary-dark mb-2">{mission.title}</h3>
              <p className="text-gray-700">{mission.description}</p>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'our-ceo',
      label: 'Our CEO',
      icon: <FaUser className="w-4 h-4 mr-2" />,
      content: (
        <div className="space-y-6 py-2">
          <CEOProfile 
            name={founder.name}
            image={founder.image}
            title="Founder & CEO"
            description={founder.description}
          />
        </div>
      ),
    },
    {
      id: 'our-team',
      label: 'Our Team',
      icon: <FaUsers className="w-4 h-4 mr-2" />,
      content: (
        <div className="space-y-6 py-2">
          {/* In mobile view show header, in desktop view it's handled by section header */}
          <div className="md:hidden">
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <motion.span
                className="inline-block text-sm font-medium tracking-wider text-[var(--tertiary-color)] uppercase mb-2"
                variants={itemVariants}
              >
                THE PEOPLE BEHIND OUR PRODUCTS
              </motion.span>
              <motion.h2
                className="text-3xl md:text-4xl font-serif font-bold text-[var(--primary-color)] mb-3"
                variants={itemVariants}
              >
                Meet Our Team
              </motion.h2>
              <div className="flex justify-center">
                <div className="h-1 w-16 bg-[var(--primary-color)] rounded-full mb-4 opacity-80"></div>
              </div>
              <motion.p
                className="text-center text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
                variants={itemVariants}
              >
                Our talented team is dedicated to creating and delivering natural products
                that maintain the highest standards of quality and purity.
              </motion.p>
            </motion.div>
          </div>
          
          {/* Team Activities Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {teamImages.map((image: GalleryImage, idx: number) => (
              <motion.div 
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden border-none shadow-md transition-all duration-300 group-hover:shadow-xl h-full">
                  <CardContent className="p-0 h-full">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <Image 
                        src={image.src}
                        alt={image.alt || "Team activity"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Permanent semi-transparent overlay with text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 mx-auto">
                          <FaUsers className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-xl font-medium text-white text-center mb-3">
                          {image.alt?.split('-')[0].trim()}
                        </h3>
                        <p className="text-white/90 text-base text-center leading-relaxed">
                          {image.alt?.split('-')[1].trim()}
                        </p>
                      </div>
                      {/* Additional hover effect */}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ),
    },
    {
      id: 'our-values',
      label: 'Values',
      icon: <FaAward className="w-4 h-4 mr-2" />,
      content: (
        <div className="space-y-6 py-2">
          {/* In mobile view show header, in desktop view it's handled by section header */}
          <div className="md:hidden">
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <motion.span
                className="inline-block text-sm font-medium tracking-wider text-[var(--tertiary-color)] uppercase mb-2"
                variants={itemVariants}
              >
                OUR GUIDING PRINCIPLES
              </motion.span>
              <motion.h2
                className="text-3xl md:text-4xl font-serif font-bold text-[var(--primary-color)] mb-3"
                variants={itemVariants}
              >
                Our Core Values
              </motion.h2>
              <div className="flex justify-center">
                <div className="h-1 w-16 bg-[var(--primary-color)] rounded-full mb-4 opacity-80"></div>
              </div>
              <motion.p
                className="text-center text-gray-600 max-w-2xl mx-auto text-base leading-relaxed"
                variants={itemVariants}
              >
                At Naadan Sowkhya, we operate with a set of guiding principles that inform everything we do.
              </motion.p>
            </motion.div>
          </div>
          
          <Card className="overflow-hidden border-earth-khaki/20 shadow-md mt-8">
            <CardContent className="p-6 bg-cream">
              <Badge variant="outline" className="mb-2 bg-earth-terracotta/10 text-earth-terracotta border-earth-terracotta">Our Vision</Badge>
              <h3 className="text-xl font-serif font-medium text-earth-terracotta mb-2">{vision.title}</h3>
              <p className="text-gray-700">{vision.description}</p>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              { 
                title: "Sustainability", 
                icon: <FaLeaf className="h-8 w-8 text-primary" />,
                description: "We're committed to environmentally friendly practices in all aspects of our production." 
              },
              { 
                title: "Quality", 
                icon: <FaAward className="h-8 w-8 text-primary" />,
                description: "We never compromise on the quality of our ingredients and finished products." 
              },
              { 
                title: "Transparency", 
                icon: <FaUsers className="h-8 w-8 text-primary" />,
                description: "We believe in honest communication about our products and processes." 
              }
            ].map((value, idx) => (
              <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow p-1">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-medium text-primary-dark">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'our-facility',
      label: 'Facility',
      icon: <FaMapMarkerAlt className="w-4 h-4 mr-2" />,
      content: (
        <div className="py-2">
          {/* In mobile view show header in FacilityGallery, in desktop view it's handled by section header */}
          <FacilityGallery images={manufacturingImages} showHeader={false} />
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Mobile view with tabs */}
      <Tabs defaultValue="our-story" className="md:hidden">
        <TabsList className="w-full bg-cream mb-6 overflow-x-auto flex justify-start p-1 rounded-full">
          {tabItems.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="flex items-center whitespace-nowrap rounded-full data-[state=active]:bg-primary data-[state=active]:text-white"
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
            className="pb-8"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Desktop view - all content displayed in full with navigation */}
      <div className="hidden md:flex flex-col space-y-12">
        <div className="sticky top-20 z-10 bg-white py-4 border-b">
          <div className="flex justify-center">
            <div className="bg-cream/80 backdrop-blur-sm p-1 rounded-full flex items-center space-x-2">
              {tabItems.map((tab) => (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  className="flex items-center px-5 py-2 text-gray-700 hover:text-primary rounded-full transition-colors whitespace-nowrap hover:bg-white/80"
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span>{tab.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {tabItems.map((tab) => (
          <motion.section 
            key={tab.id} 
            id={tab.id} 
            className="scroll-mt-32 relative"
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
            
            {/* Don't show section header for first tab in desktop view to avoid duplicate headers */}
            {tab.id !== 'our-story' && (
              <motion.div className="text-center mb-12" variants={itemVariants}>
                <motion.span
                  className="inline-block text-sm font-medium tracking-wider text-[var(--tertiary-color)] uppercase mb-2"
                  variants={itemVariants}
                >
                  {tab.id.replace('-', ' ')}
                </motion.span>
                <motion.h2
                  className="text-3xl md:text-4xl font-serif font-bold text-[var(--primary-color)] mb-3"
                  variants={itemVariants}
                >
                  {tab.label}
                </motion.h2>
                <div className="flex justify-center">
                  <div className="h-1 w-16 bg-[var(--primary-color)] rounded-full mb-4 opacity-80"></div>
                </div>
              </motion.div>
            )}
            
            <div className="relative z-10">
              {tab.content}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default AboutTabs;
