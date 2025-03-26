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
  { id: "guarantee", label: "Our Guarantee" },
  { id: "about", label: "About Us" },
  { id: "categories", label: "Categories" },
  { id: "products", label: "Products" },
  { id: "testimonials", label: "Testimonials" },
  { id: "gallery", label: "Gallery" }, 
  { id: "certifications", label: "Certifications" },
];

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
      <SectionWrapper id="hero">
        <HeroSlider slides={homepageData.slider} />
      </SectionWrapper>

      <div className="space-y-8 md:space-y-16 lg:space-y-24">
        {/* Product Guarantee */}
        <SectionWrapper id="guarantee">
          <ScrollRevealContainer animation="fade-up" duration={800} offset={120}>
            <ProductGuarantee />
          </ScrollRevealContainer>
        </SectionWrapper>
        
        {/* About Section - Collapsible on mobile */}
        <SectionWrapper id="about">
          <CollapsibleSection title="About Us" initiallyExpanded={true}>
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
          </CollapsibleSection>
        </SectionWrapper>
        
        {/* Product Categories - Priority section, always visible */}
        <SectionWrapper id="categories">
          <ScrollRevealContainer 
            animation="fade-up" 
            duration={600} 
            offset={100}
            className="bg-white py-8 md:py-12"
          >
            <ProductCategories data={homepageData.productCategoriesSection} />
          </ScrollRevealContainer>
        </SectionWrapper>
        
        {/* Featured Products - Priority section, always visible */}
        <SectionWrapper id="products">
          <ScrollRevealContainer 
            animation="fade-up" 
            duration={600} 
            offset={100}
            className="bg-gray-50 py-8 md:py-12"
          >
            <FeaturedProducts 
              title="Our Products"
              subtitle="Experience Our Natural & Chemical-Free Products"
              productIds={homepageData.featuredProducts}
              allProducts={productsData.products}
            />
          </ScrollRevealContainer>
        </SectionWrapper>
        
        {/* Testimonials - Collapsible on mobile */}
        <SectionWrapper id="testimonials">
          <CollapsibleSection title="What Our Customers Say" initiallyExpanded={false}>
            <ScrollRevealContainer animation="fade-up" duration={600} offset={100}>
              <TestimonialsSection testimonials={homepageData.testimonials} />
            </ScrollRevealContainer>
          </CollapsibleSection>
        </SectionWrapper>
        
        {/* Gallery - Collapsible on mobile */}
        <SectionWrapper id="gallery">
          <CollapsibleSection title="Our Gallery" initiallyExpanded={false}>
            <ScrollRevealContainer animation="fade-up" duration={600} offset={100}>
              <GallerySection 
                title={homepageData.gallery.title}
                images={homepageData.gallery.images}
              />
            </ScrollRevealContainer>
          </CollapsibleSection>
        </SectionWrapper>

        <SectionWrapper id="certifications">
          <ScrollRevealContainer animation="fade-up" duration={800}>
            <CertificationsSection certifications={homepageData.certifications} />
          </ScrollRevealContainer>
        </SectionWrapper>
      </div>

      {/* Mobile Navigation */}
      <MobileSectionNav sections={sections} />

      {/* Quick to top button for mobile */}
      <div className="fixed bottom-16 right-4 flex flex-col gap-2 md:hidden">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="p-2 bg-white rounded-full shadow-lg"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default HomePage;
