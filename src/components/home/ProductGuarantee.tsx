'use client';
import { motion } from 'framer-motion';
import { CheckCircle, FlaskConicalOff, Leaf, ShieldCheck, Info } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from "@/lib/utils";
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

// Enhanced guarantee data with additional properties for visual storytelling
const guarantees = [
  {
    icon: <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-primary" />,
    title: '100% Natural',
    description: 'All our products are made with natural ingredients, free from harmful chemicals',
    bgPattern: "radial-gradient(circle, rgba(139, 195, 74, 0.1) 0%, rgba(255,255,255,0) 70%)",
    accentColor: "rgba(139, 195, 74, 0.2)",
    learnMore: "Our ingredients are sourced from organic farms and sustainable suppliers who share our values."
  },
  {
    icon: <FlaskConicalOff className="w-10 h-10 md:w-12 md:h-12 text-primary" />,
    title: 'No Preservatives',
    description: 'Our products contain no artificial preservatives or additives',
    bgPattern: "radial-gradient(circle, rgba(103, 58, 183, 0.1) 0%, rgba(255,255,255,0) 70%)",
    accentColor: "rgba(103, 58, 183, 0.2)",
    learnMore: "We use traditional techniques to ensure product longevity without resorting to synthetic preservatives."
  },
  {
    icon: <Leaf className="w-10 h-10 md:w-12 md:h-12 text-primary" />,
    title: 'Eco-Friendly',
    description: 'Sustainable packaging and environmentally conscious practices',
    bgPattern: "radial-gradient(circle, rgba(76, 175, 80, 0.1) 0%, rgba(255,255,255,0) 70%)",
    accentColor: "rgba(76, 175, 80, 0.2)",
    learnMore: "Our packaging is biodegradable, and we've reduced our carbon footprint by 30% in the last year."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-primary" />,
    title: 'Quality Assured',
    description: 'Every product meets our high standards of quality and effectiveness',
    bgPattern: "radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, rgba(255,255,255,0) 70%)",
    accentColor: "rgba(33, 150, 243, 0.2)",
    learnMore: "Our products undergo rigorous testing and quality control before reaching our valued customers."
  }
];

const ProductGuarantee = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const sectionVariants = {
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6 
      }
    },
  };

  const toggleExpand = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <motion.section
      id="product-guarantee"
      className="relative py-0 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Enhanced natural texture overlay with parallax effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-5"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="flex flex-col items-center mb-8">
            <span className="inline-block px-3 py-1 mb-2 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase">Our Promise</span>
            <h2 className="text-3xl font-serif font-bold text-primary-dark mb-2 tracking-tight">Our Product Guarantee</h2>
            <div className="mx-auto w-24 h-1 bg-primary rounded-full mb-2" />
            <p className="text-center text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
              Experience the difference of our natural and pure products, crafted with care and commitment to quality.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {guarantees.map((guarantee, index) => (
              <motion.div 
                key={guarantee.title} 
                variants={itemVariants}
                className="relative"
              >
                <Card 
                  className={cn(
                    "h-full text-center border border-gray-200 hover:shadow-md transition-all duration-300",
                    "backdrop-blur-sm overflow-hidden relative rounded-card",
                    expandedCard === index ? "ring-2 ring-primary" : ""
                  )}
                  style={{
                    background: guarantee.bgPattern,
                  }}
                >
                  {/* Decorative accents */}
                  <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full" 
                    style={{ background: guarantee.accentColor, opacity: 0.3 }}></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 -ml-8 -mb-8 rounded-full" 
                    style={{ background: guarantee.accentColor, opacity: 0.2 }}></div>
                  
                  <CardHeader className="items-center pt-5 md:pt-6 pb-2 md:pb-3 relative z-10">
                    <motion.div
                      className="p-3 rounded-full shadow-sm"
                    >
                      {guarantee.icon}
                    </motion.div>
                  </CardHeader>

                  <CardContent className="pb-5 md:pb-6 relative z-10">
                    <CardTitle className="text-lg md:text-xl font-serif font-semibold mb-2 text-primary-dark">
                      {guarantee.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed text-sm mb-3">
                      {guarantee.description}
                    </CardDescription>
                    
                    {/* Learn more expandable content */}
                    <motion.div 
                      className="cursor-pointer flex items-center justify-center gap-1 text-xs text-primary"
                      onClick={() => toggleExpand(index)}
                      aria-label="Learn more"
                    >
                      <Info className="w-3 h-3" /> 
                      <span>{expandedCard === index ? "Show less" : "Learn more"}</span>
                    </motion.div>
                    
                    {expandedCard === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 text-xs text-gray-600 bg-natural-light/60 p-3 rounded-md"
                      >
                        {guarantee.learnMore}
                      </motion.div>
                    )}
                  </CardContent>
                  
                  {/* Badge-like accent */}
                  <div className="absolute top-0 left-0 w-full h-1" 
                    style={{ background: guarantee.accentColor }}></div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Trust badge section */}
          <motion.div 
            className="mt-10 flex flex-wrap justify-center gap-4 items-center"
            variants={itemVariants}
          >
            <div className="backdrop-blur-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-xs text-gray-600">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="font-medium">Ayurvedic Certified</span>
            </div>
            <div className="backdrop-blur-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="font-medium">Quality Tested</span>
            </div>
            <div className="backdrop-blur-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-2 text-xs text-gray-600">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="font-medium">Sustainably Sourced</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductGuarantee;
