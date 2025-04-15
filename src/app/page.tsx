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
import cn from 'classnames';

// Dynamically import components that use client-side features
const ScrollRevealContainer = dynamic(() => import("@/components/ui/ScrollRevealContainer") as LoaderComponent<ScrollRevealProps>, {
  ssr: false
});

const StickyNav = dynamic(() => import("@/components/ui/StickyNav"), {
  ssr: false
});

const CollapsibleSection = dynamic(() => import("@/components/ui/CollapsibleSection") as LoaderComponent<CollapsibleSectionProps>, {
  ssr: false
});

// Section navigation data
const sections = [
  { id: "hero", label: "Home" },
  { id: "products", label: "Products" },
  { id: "about", label: "About Us" },
  { id: "reviews", label: "Reviews" },
  { id: "gallery", label: "Gallery" }, 
  { id: "certifications", label: "Certifications" },
];

// Consistent spacing wrapper component
interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const SectionWrapper = ({ id, children, className = "" }: SectionWrapperProps): React.ReactElement => (
  <div
    id={id}
    className={cn(
      "section-scroll",
      id === "hero" ? "pb-8 md:pb-12" : "pt-8 md:pt-12",
      className,
      "bg-[var(--natural-light)] relative"
    )}
  >
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-5" />
    </div>
    <div className="section-content relative z-10">
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
      
      {/* Mobile Navigation - StickyNav now contains tab functioanlity from HomePageTabs */}
      <StickyNav sections={sections} />
      
      {/* Mobile Tab-Based Layout */}
      <div className="md:hidden">
        <HomePageTabs 
          homepageData={homepageData}
          productsData={productsData}
        />
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Product Guarantee - final polish: extra top padding for modern separation */}
        <SectionWrapper id="guarantee" className="pt-20 md:pt-32 scroll-mt-32 md:scroll-mt-[112px]">
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
            className="w-full"
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
            className="w-full"
          >
            <FeaturedProducts 
              title="Our Products"
              subtitle="Experience Our Natural & Chemical-Free Products"
              productIds={homepageData.productCategoriesSection.featuredProducts}
              allProducts={productsData.products}
              showAsCards={false}
            />
          </ScrollRevealContainer>
        </SectionWrapper>
        
        {/* Testimonials */}
        <SectionWrapper id="reviews">
          <ScrollRevealContainer 
            animation="fade-up" 
            duration={600} 
            offset={100}
            className="w-full"
          >
            <TestimonialsSection testimonials={homepageData.testimonials} />
          </ScrollRevealContainer>
        </SectionWrapper>
        
        {/* Gallery */}
        <SectionWrapper id="gallery">
          <ScrollRevealContainer 
            animation="fade-up" 
            duration={600} 
            offset={100}
            className="w-full"
          >
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
    </>
  );
};

export default HomePage;
