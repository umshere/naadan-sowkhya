'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from "@/components/ui/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import { Card, CardContent } from '@/components/ui/Card';

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
      className="relative py-0 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-5"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="flex justify-center mb-2 md:mb-3">
            <Badge variant="outline" className="text-sm font-medium tracking-wider uppercase text-[var(--subheading-color)]">
              Customer Experiences
            </Badge>
          </div>
          <motion.h2
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-2 md:mb-3 text-[var(--primary-color)] relative"
            variants={itemVariants}
          >
            What Our Customers Say
            <span className="block mx-auto mt-2 w-12 h-1 rounded-full bg-[var(--primary-color)]"></span>
          </motion.h2>
          <motion.p className="text-center text-gray-600 max-w-2xl mx-auto text-base leading-relaxed mb-8" variants={itemVariants}>
            Read authentic testimonials from our valued customers who have experienced the quality of our natural products.
          </motion.p>
        </motion.div>

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
                  <div className="p-1 h-full">
                    <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow bg-white">
                      <CardContent className="flex flex-col items-start p-6 space-y-4">
                        <p className="text-gray-600 italic leading-relaxed">
                          &ldquo;{testimonial.text}&rdquo;
                        </p>
                        <p className="font-semibold text-blue-600 pt-2">
                          - {testimonial.name}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden md:inline-flex" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden md:inline-flex" />
          </Carousel>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          variants={itemVariants}
        >
          <Link href="/testimonials" passHref legacyBehavior>
            <Button asChild size="lg" aria-label="View all testimonials">
              <a>
                View All Testimonials
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
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
