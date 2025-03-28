'use client';
import { ReactNode, useEffect, useState } from 'react';
import { FaLeaf, FaStar, FaImage, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AboutSection from '@/components/home/AboutSection';
import ProductGuarantee from '@/components/home/ProductGuarantee';
import ProductCategories from '@/components/home/ProductCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import GallerySection from '@/components/home/GallerySection';
import CertificationsSection from '@/components/home/CertificationsSection';

interface HomePageTabsProps {
  homepageData: any;
  productsData: any;
}

export default function HomePageTabs({ homepageData, productsData }: HomePageTabsProps) {
  const [activeTab, setActiveTab] = useState('products');
  
  // Smooth scroll to the content when tab changes
  useEffect(() => {
    // Using setTimeout to ensure the tab content has rendered before scrolling
    const timer = setTimeout(() => {
      const tabContent = document.getElementById(`${activeTab}-content`);
      if (tabContent) {
        // Get the content start position relative to the viewport
        const elementPosition = tabContent.getBoundingClientRect().top;
        // Calculate the absolute position to scroll to, accounting for current scroll and header offset
        const offsetPosition = elementPosition + window.pageYOffset - 70; // 70px offset for header
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50); // Delay to allow content rendering
    
    return () => clearTimeout(timer); // Cleanup timer on unmount or tab change
  }, [activeTab]); // Rerun only when activeTab changes
  
  // Define tab content and icons
  const tabItems = [
    {
      id: 'products',
      label: 'Products',
      icon: <FaLeaf className="w-4 h-4 mr-1.5" />,
      content: (
        <div id="products-content" className="space-y-10 py-3">
          {/* Product Guarantee */}
          <div className="mb-6">
            <ProductGuarantee />
          </div>
          
          {/* Product Categories */}
          <div className="mb-6">
            <ProductCategories data={homepageData.productCategoriesSection} />
          </div>
          
          {/* Featured Products */}
          <div>
            <FeaturedProducts 
              title="Our Products"
              subtitle="Experience Our Natural & Chemical-Free Products"
              productIds={homepageData.productCategoriesSection.featuredProducts}
              allProducts={productsData.products}
              showAsCards={true} // Enable card display for mobile
            />
          </div>
        </div>
      ),
    },
    {
      id: 'about',
      label: 'About Us',
      icon: <FaInfoCircle className="w-4 h-4 mr-1.5" />,
      content: (
        <div id="about-content" className="py-3">
          <AboutSection 
            title={homepageData.about.title}
            description={homepageData.about.description}
            buttonText={homepageData.about.buttonText}
            buttonLink={homepageData.about.buttonLink}
            images={homepageData.about.images}
          />
        </div>
      ),
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: <FaStar className="w-4 h-4 mr-1.5" />,
      content: (
        <div id="reviews-content" className="py-3">
          <TestimonialsSection testimonials={homepageData.testimonials} />
        </div>
      ),
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: <FaImage className="w-4 h-4 mr-1.5" />,
      content: (
        <div id="gallery-content" className="space-y-10 py-3">
          <GallerySection 
            title={homepageData.gallery.title}
            images={homepageData.gallery.images}
          />
          
          <div className="mt-10">
            <CertificationsSection certifications={homepageData.certifications} />
          </div>
        </div>
      ),
    },
  ];

  // Tab indicator animation
  const tabIndicatorVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
  };

  // Find the active tab content
  const activeTabContent = tabItems.find(tab => tab.id === activeTab)?.content;

  return (
    <div className="md:hidden pt-3 pb-20">
      <Tabs 
        defaultValue="products" 
        className="w-full"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList 
          className="w-full bg-cream mb-1 sticky top-[60px] z-20 flex justify-between shadow-sm overflow-x-auto no-scrollbar"
        >
          {tabItems.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="flex items-center relative px-3 py-2 flex-1 justify-center text-sm transition-all data-[state=active]:font-medium"
            >
              <span className="flex items-center">
                {tab.icon}
                {tab.label}
              </span>
              
              {/* Active indicator dot */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute -bottom-0.5 left-0 right-0 mx-auto w-1.5 h-1.5 bg-[var(--primary-color)] rounded-full"
                  initial="initial"
                  animate="animate"
                  variants={tabIndicatorVariants}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {/* Fixed: Only pass one child to AnimatePresence with mode="wait" */}
        {tabItems.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <AnimatePresence mode="wait">
              {activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[70vh]"
                >
                  {tab.content}
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
