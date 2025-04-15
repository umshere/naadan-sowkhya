'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'; 
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge'; 
import { cn } from '@/lib/utils';
import { 
  ArrowRight, 
  Leaf, 
  Utensils, 
  Sparkles, 
  Flower, 
  ChevronRight,
  ShieldCheck,
  Check,
  Droplet,
  Apple,
  HeartPulse,
  Star
} from 'lucide-react';

// Define the props interface
interface ProductCategoriesProps {
  data: {
    title: string;
    subtitle: string;
    categories: Array<{
      id: string;
      name: string;
      image: string;
      link: string;
      description: string;
    }>;
  };
}

// Category styles with enhanced visual elements
const categoryStyles = {
  'natural-hair-care': {
    icon: Droplet,
    gradient: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(255,255,255,0) 70%)",
    accentColor: "rgba(76, 175, 80, 0.7)",
    iconBg: "linear-gradient(135deg, rgba(76, 175, 80, 0.9), rgba(56, 142, 60, 1))",
    features: ["Chemical-free", "Herbal ingredients", "Traditional recipes"]
  },
  'food-products': {
    icon: Apple,
    gradient: "linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255,255,255,0) 70%)",
    accentColor: "rgba(255, 193, 7, 0.7)",
    iconBg: "linear-gradient(135deg, rgba(255, 193, 7, 0.9), rgba(255, 160, 0, 1))",
    features: ["Pure & natural", "Traditional process", "No preservatives"]
  },
  'natural-cosmetics': {
    icon: Sparkles,
    gradient: "linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(255,255,255,0) 70%)",
    accentColor: "rgba(156, 39, 176, 0.7)",
    iconBg: "linear-gradient(135deg, rgba(156, 39, 176, 0.9), rgba(123, 31, 162, 1))",
    features: ["Natural extracts", "Skin-friendly", "Ayurvedic formulas"]
  },
  'herbal-products': {
    icon: HeartPulse,
    gradient: "linear-gradient(135deg, rgba(0, 150, 136, 0.1) 0%, rgba(255,255,255,0) 70%)",
    accentColor: "rgba(0, 150, 136, 0.7)",
    iconBg: "linear-gradient(135deg, rgba(0, 150, 136, 0.9), rgba(0, 121, 107, 1))",
    features: ["Organic herbs", "Age-old wisdom", "Health benefits"]
  }
};

const categoryVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.1
    } 
  },
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
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6 
    }
  },
};

// Custom icon component with animation
const CategoryIcon = ({ icon: Icon, style }: { icon: React.ElementType, style: any }) => (
  <motion.div 
    className="mx-auto relative z-10"
    whileHover={{ scale: 1.05, rotate: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="rounded-full p-6 shadow-lg mb-4" style={{ background: style.iconBg }}>
      <Icon className="h-10 w-10 text-white" />
    </div>
  </motion.div>
);

const CategoryFeature = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
  <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
    <Icon className="h-3.5 w-3.5 text-primary" />
    <span>{text}</span>
  </div>
);

const ProductCategories = ({ data }: ProductCategoriesProps) => {
  return (
    <motion.section 
      className="relative bg-section-bg py-16 md:py-24 overflow-hidden"
      variants={categoryVariants}
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

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Section Heading - match ProductCategories style */}
        <div className="flex flex-col items-center mb-8">
          <span className="inline-block px-3 py-1 mb-2 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase">Our Product Categories</span>
          <h2 className="text-3xl font-serif font-bold text-primary-dark mb-2 tracking-tight">Our Product Categories</h2>
          <div className="mx-auto w-24 h-1 bg-primary rounded-full mb-2" />
          <p className="text-center text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {data.categories.map((category) => {
            const style = categoryStyles[category.id as keyof typeof categoryStyles] || categoryStyles['natural-hair-care'];
            const features = style.features || [];
            
            return (
              <motion.div 
                key={category.id}
                variants={itemVariants} 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex flex-col h-full"
              >
                <Card 
                  className={cn(
                    "h-full border border-gray-200 hover:shadow-md transition-all duration-300",
                    "bg-white/90 backdrop-blur-sm overflow-hidden relative rounded-card flex flex-col"
                  )}
                  style={{ background: style.gradient }}
                >
                  {/* Decorative accents */}
                  <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full" 
                    style={{ background: style.accentColor, opacity: 0.15 }}></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 -ml-8 -mb-8 rounded-full" 
                    style={{ background: style.accentColor, opacity: 0.1 }}></div>
                  
                  {/* Badge-like accent */}
                  <div className="absolute top-0 left-0 w-full h-1" 
                    style={{ background: style.accentColor }}></div>
                  
                  {/* Replace image with stylish icon */}
                  <CardHeader className="pt-8 pb-1">
                    <CategoryIcon icon={style.icon} style={style} />
                  </CardHeader>
                  
                  <CardContent className="p-5 md:p-6 flex-grow text-center">
                    <CardTitle className="font-serif text-xl font-semibold text-primary-dark mb-3">
                      {category.name}
                    </CardTitle>
                    
                    <CardDescription className="text-sm text-gray-600 mb-6">
                      {category.description}
                    </CardDescription>
                    
                    {/* Feature highlights */}
                    <div className="space-y-2 mt-auto">
                      <div className="flex flex-col space-y-1.5">
                        {features.map((feature, idx) => (
                          <CategoryFeature 
                            key={idx} 
                            icon={ChevronRight} 
                            text={feature} 
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                    <Button
                      asChild
                      className="w-full bg-primary text-white hover:bg-primary-dark transition-colors rounded-full"
                      aria-label={`View ${category.name} products`}
                    >
                      <Link href={category.link}>
                        View Products
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Trust indicator section - matching with ProductGuarantee */}
        <motion.div 
          className="mt-12 flex flex-wrap justify-center gap-4 items-center"
          variants={itemVariants}
        >
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-xs text-gray-600">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="font-medium">100% Authentic Products</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-xs text-gray-600">
            <Star className="w-4 h-4 text-primary" />
            <span className="font-medium">Premium Quality</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductCategories;
