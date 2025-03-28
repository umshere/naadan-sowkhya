'use client';

import dynamic, { type LoaderComponent } from 'next/dynamic';
import type { ReactNode } from 'react';
import AboutSection from "@/components/home/AboutSection";
import ProductGuarantee from "@/components/home/ProductGuarantee";
import ProductCategories from "@/components/home/ProductCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CertificationsSection from "@/components/home/CertificationsSection";
import GallerySection from "@/components/home/GallerySection";
import HomePageTabs from "@/components/home/HomePageTabs";
import homepageData from "@/data/homepage.json";
import productsData from "@/data/products.json";
import HeroSlider from "@/components/home/HeroSlider";
import type { ScrollRevealProps, CollapsibleSectionProps, SectionWrapperProps } from "@/types/ui";

// Dynamically import components that use client-side features
const ScrollRevealContainer = dynamic(() => import("@/components/ui/ScrollRevealContainer") as LoaderComponent<ScrollRevealProps>, {
  ssr: false
});

const MobileSectionNav = dynamic(() => import("@/components/ui/MobileSectionNav"), {
  ssr: false
});

const CollapsibleSection = dynamic(() => import("@/components/ui/CollapsibleSection") as LoaderComponent<CollapsibleSectionProps>, {
  ssr: false
});

// Section navigation data
interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "products", label: "Products" },
  { id: "about", label: "About Us" },
  { id: "gallery", label: "Gallery" }, 
  { id: "certifications", label: "Certifications" },
];

// Consistent spacing wrapper component
const SectionWrapper = ({ id, children }: SectionWrapperProps): React.ReactElement => (
  <div id={id} className="section-scroll">
    <div className="section-content">
      {children}
    </div>
  </div>
);

const HomePage = (): React.ReactElement => {
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper id="hero">
        <HeroSlider slides={homepageData.slider} />
      </SectionWrapper>
      
      {/* Mobile Tab-Based Layout */}
      <div className="md:hidden">
        <HomePageTabs 
          homepageData={homepageData}
          productsData={productsData}
        />
      </div>
      
      {/* Desktop Layout - Updated with consistent spacing */}
      <div className="hidden md:block space-y-12 md:space-y-16">
        {/* Product Guarantee */}
        <SectionWrapper id="guarantee">
          <ScrollRevealContainer animation="fade-up" duration={800} offset={120}>
            <ProductGuarantee />
          </ScrollRevealContainer>
        </SectionWrapper>
        
        {/* About Section */}
        <SectionWrapper id="about">
          <ScrollRevealContainer 
            animation="fade-up" 
            duration={600} 
            offset={100}
          >
            <AboutSection 
              title={homepageData.about.title}
              description={homepageData.about.description}
              buttonText={homepageData.about.buttonText}
              buttonLink={homepageData.about.buttonLink}
              images={homepageData.about.images}
            />
          </ScrollRevealContainer>
        </SectionWrapper>
        
        {/* Product Categories */}
        <SectionWrapper id="categories">
          <ScrollRevealContainer 
            animation="fade-up" 
            duration={600} 
            offset={100}
            className="bg-white py-8 md:py-10"
          >
            <ProductCategories data={homepageData.productCategoriesSection} />
          </ScrollRevealContainer>
        </SectionWrapper>
        
        {/* Featured Products */}
        <SectionWrapper id="products">
          <ScrollRevealContainer 
            animation="fade-up" 
            duration={600} 
            offset={100}
            className="bg-gray-50 py-8 md:py-10"
          >
            <FeaturedProducts 
              title="Our Products"
              subtitle="Experience Our Natural & Chemical-Free Products"
              productIds={homepageData.productCategoriesSection.featuredProducts}
              allProducts={productsData.products}
              showAsCards={false} // Use carousel for desktop
            />
          </ScrollRevealContainer>
        </SectionWrapper>
        
        {/* Testimonials */}
        <SectionWrapper id="testimonials">
          <ScrollRevealContainer animation="fade-up" duration={600} offset={100}>
            <TestimonialsSection testimonials={homepageData.testimonials} />
          </ScrollRevealContainer>
        </SectionWrapper>
        
        {/* Gallery */}
        <SectionWrapper id="gallery">
          <ScrollRevealContainer animation="fade-up" duration={600} offset={100}>
            <GallerySection 
              title={homepageData.gallery.title}
              images={homepageData.gallery.images}
            />
          </ScrollRevealContainer>
        </SectionWrapper>
        
        {/* Certifications */}
        <SectionWrapper id="certifications">
          <ScrollRevealContainer animation="fade-up" duration={800}>
            <CertificationsSection certifications={homepageData.certifications} />
          </ScrollRevealContainer>
        </SectionWrapper>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <MobileSectionNav sections={sections} />
      </div>
    </>
  );
};

export default HomePage;
