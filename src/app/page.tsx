'use client';

import HeroSlider from "@/components/home/HeroSlider";
import AboutSection from "@/components/home/AboutSection";
import ProductGuarantee from "@/components/home/ProductGuarantee";
import ProductCategories from "@/components/home/ProductCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CertificationsSection from "@/components/home/CertificationsSection";
import GallerySection from "@/components/home/GallerySection";
import ScrollRevealContainer from "@/components/ui/ScrollRevealContainer";
import homepageData from "@/data/homepage.json";
import productsData from "@/data/products.json";

export default function Home() {
  return (
    <>
      <HeroSlider slides={homepageData.slider} />
      
      <div className="space-y-16 md:space-y-24">
        {/* Product Guarantee */}
        <ScrollRevealContainer animation="fade-up" duration={800} offset={120}>
          <ProductGuarantee />
        </ScrollRevealContainer>
        
        {/* About Section */}
        <ScrollRevealContainer animation="fade-right" duration={1000} offset={150}>
          <AboutSection 
            title={homepageData.about.title}
            description={homepageData.about.description}
            buttonText={homepageData.about.buttonText}
            buttonLink={homepageData.about.buttonLink}
            images={homepageData.about.images}
          />
        </ScrollRevealContainer>
        
        {/* Product Categories */}
        <ScrollRevealContainer animation="zoom-in" duration={900} offset={130}>
          <ProductCategories data={homepageData.productCategoriesSection} />
        </ScrollRevealContainer>
        
        {/* Featured Products */}
        <ScrollRevealContainer animation="fade-up" duration={800} offset={120}>
          <FeaturedProducts 
            title="Our Products"
            subtitle="Experience Our Natural & Chemical-Free Products"
            productIds={homepageData.featuredProducts}
            allProducts={productsData.products}
          />
        </ScrollRevealContainer>
        
        {/* Testimonials */}
        <ScrollRevealContainer animation="fade-left" duration={1000} offset={140}>
          <TestimonialsSection testimonials={homepageData.testimonials} />
        </ScrollRevealContainer>
        
        {/* Gallery */}
        <ScrollRevealContainer animation="zoom-in" duration={900} offset={130}>
          <GallerySection 
            title={homepageData.gallery.title}
            images={homepageData.gallery.images}
          />
        </ScrollRevealContainer>
        
        {/* Certifications */}
        <ScrollRevealContainer animation="fade-up" duration={800} delay={200}>
          <CertificationsSection certifications={homepageData.certifications} />
        </ScrollRevealContainer>
      </div>
    </>
  );
}
