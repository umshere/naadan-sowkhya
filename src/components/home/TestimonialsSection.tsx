'use client';

import { useRef } from 'react'; // Removed useState, useEffect as they are no longer needed directly here
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge"; // Import Badge
import { Button } from "@/components/ui/button"; // Import Button
import { Card, CardContent } from "@/components/ui/card"; // Import Card
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Import Carousel

interface Testimonial {
  id: number;
  name: string;
  text: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Section animation variants remain the same
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

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-muted/40 overflow-hidden" // Use muted background
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Subtle background texture - kept as is */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-5"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Updated Section Header using Badge and Shadcn typography */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="text-sm font-medium tracking-wider uppercase mb-3">
              Customer Experiences
            </Badge>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4" // Use primary color
            variants={itemVariants}
          >
            What Our Customers Say
          </motion.h2>
          {/* Removed the underline div, relying on spacing */}
          <motion.p
            className="text-center text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed" // Use muted-foreground
            variants={itemVariants}
          >
            Read authentic testimonials from our valued customers who have experienced the quality of our natural products.
          </motion.p>
        </motion.div>

        {/* Replaced custom carousel with Shadcn Carousel */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full"> {/* Added padding for spacing between cards */}
                    <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"> {/* Added hover effect */}
                      <CardContent className="flex flex-col items-start p-6 space-y-4"> {/* Adjusted padding */}
                        <p className="text-muted-foreground italic leading-relaxed">
                          &ldquo;{testimonial.text}&rdquo;
                        </p>
                        <p className="font-semibold text-primary pt-2"> {/* Added padding-top */}
                          - {testimonial.name}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden md:inline-flex" /> {/* Position controls outside on larger screens */}
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden md:inline-flex" />
          </Carousel>
        </motion.div>

        {/* Replaced custom Link button with Shadcn Button */}
        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
        >
          <Link href="/testimonials" passHref legacyBehavior>
            <Button asChild size="lg">
              <a> {/* Use anchor tag inside Button with asChild */}
                View All Testimonials
                <svg
                  className="w-4 h-4 ml-2" // Added margin-left
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3" // Updated arrow icon
                  />
                </svg>
              </a>
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
