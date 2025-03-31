'use client';
import { ReactNode, useEffect, useState } from 'react';
import { FaLeaf, FaStar, FaImage, FaInfoCircle, FaAward } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from "@/components/ui/separator";
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
  // Define tab content and icons
  const tabItems = [
    {
      id: 'products',
      label: 'Products',
      icon: <FaLeaf className="w-4 h-4 mr-1.5" />,
      content: (
        <div id="products-content" className="space-y-4">
          {/* Product Guarantee */}
          <div className="mb-2">
            <ProductGuarantee />
          </div>
          
          {/* Product Categories */}
          <div className="mb-2">
            <ProductCategories data={homepageData.productCategoriesSection} />
          </div>
          
          {/* Featured Products */}
          <div className="mb-2">
            <FeaturedProducts 
              title="Our Products"
              subtitle="Experience Our Natural & Chemical-Free Products"
              productIds={homepageData.productCategoriesSection.featuredProducts}
              allProducts={productsData.products}
              showAsCards={true}
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
        <div id="about-content">
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
        <div id="reviews-content">
          <TestimonialsSection testimonials={homepageData.testimonials} />
        </div>
      ),
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: <FaImage className="w-4 h-4 mr-1.5" />,
      content: (
        <div id="gallery-content" className="space-y-4">
          <GallerySection 
            title={homepageData.gallery.title}
            images={homepageData.gallery.images}
          />
        </div>
      ),
    },
    {
      id: 'certifications',
      label: 'Certifications',
      icon: <FaAward className="w-4 h-4 mr-1.5" />,
      content: (
        <div id="certifications-content">
          <CertificationsSection certifications={homepageData.certifications} />
        </div>
      ),
    },
  ];

  return (
    <div className="pt-3">
      {/* Mobile view - Content Only (Navigation removed) */}
      <div className="md:hidden">
        {tabItems.map((tab) => (
          <div key={tab.id} id={tab.id} className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-primary-dark p-2 bg-primary/10 rounded-full">{tab.icon}</div>
              <h2 className="text-xl font-medium text-primary-dark">{tab.label}</h2>
              <Separator className="flex-1 ml-4" />
            </div>
            <div>
              {tab.content}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - Keep the sticky nav here for desktop only */}
      <div className="hidden md:flex flex-col space-y-4">
        <div className="sticky top-20 z-10 bg-white py-2 border-b">
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
          <section key={tab.id} id={tab.id} className="scroll-mt-24 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-primary-dark p-2 bg-primary/10 rounded-full">{tab.icon}</div>
              <h2 className="text-3xl font-serif font-bold text-primary-dark">{tab.label}</h2>
              <Separator className="flex-1 ml-4" />
            </div>
            <div>
              {tab.content}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
