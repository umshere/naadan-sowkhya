import HeroSlider from "@/components/home/HeroSlider";
import AboutSection from "@/components/home/AboutSection";
import ProductGuarantee from "@/components/home/ProductGuarantee";
import ProductCategories from "@/components/home/ProductCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CertificationsSection from "@/components/home/CertificationsSection";
import GallerySection from "@/components/home/GallerySection";

// Import data
import homepageData from "@/data/homepage.json";
import productsData from "@/data/products.json";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider slides={homepageData.slider} />
      
      {/* Product Guarantee */}
      <ProductGuarantee />
      
      {/* About Section */}
      <AboutSection 
        title={homepageData.about.title}
        description={homepageData.about.description}
        buttonText={homepageData.about.buttonText}
        buttonLink={homepageData.about.buttonLink}
        images={homepageData.about.images}
      />
      
      {/* Product Categories */}
      <ProductCategories data={homepageData.productCategoriesSection} />

      {/* Featured Products */}
      <FeaturedProducts 
        title="Our Products"
        subtitle="Experience Our Natural & Chemical-Free Products"
        productIds={homepageData.featuredProducts}
        allProducts={productsData.products}
      />
      
      {/* Testimonials */}
      <TestimonialsSection testimonials={homepageData.testimonials} />

      {/* Gallery */}
      <GallerySection 
        title={homepageData.gallery.title}
        images={homepageData.gallery.images}
      />
      
      {/* Certifications */}
      <CertificationsSection certifications={homepageData.certifications} />
    </div>
  );
}
