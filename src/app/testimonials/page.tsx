'use client';

import { useState } from 'react';
import Image from 'next/image'; // Import Next.js Image for optimization
import homepage from '@/data/homepage.json';
import testimonialImages from '@/data/testimonial-images.json';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose, // Import DialogClose
} from "@/components/ui/dialog"; // Import Dialog components
import { Button } from '@/components/ui/button'; // Import Button for close icon

interface Testimonial {
  id: number;
  name: string;
  text: string;
}

interface TestimonialImage {
  id: number;
  path: string;
  alt?: string; // Add optional alt text
}

export default function TestimonialsPage() {
  const testimonials: Testimonial[] = homepage.testimonials;
  const galleryImages: TestimonialImage[] = testimonialImages.imageGallery;

  // No need for selectedImage state with DialogTrigger

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/40 to-white">
      {/* Text Testimonials Carousel Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Updated Section Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-sm font-medium tracking-wider uppercase mb-3">
              Customer Stories
            </Badge>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              What Our Customers Say
            </h1>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              Hear directly from those who have experienced our products.
            </p>
          </div>

          {/* Shadcn Carousel */}
          <div className="max-w-4xl mx-auto">
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
                      <Card className="h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="flex flex-col items-start p-6 space-y-4">
                          <p className="text-muted-foreground italic leading-relaxed">
                            &ldquo;{testimonial.text}&rdquo;
                          </p>
                          <p className="font-semibold text-primary pt-2">
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
          </div>
        </div>
      </section>

      {/* Refactored Photo Gallery Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          {/* Updated Section Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-sm font-medium tracking-wider uppercase mb-3">
              Visual Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Photo Gallery
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              See the results and experiences shared by our customers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"> {/* Adjusted gap */}
            {galleryImages.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden cursor-pointer group border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0 aspect-square relative">
                      <Image
                        src={image.path}
                        alt={image.alt || `Testimonial ${image.id}`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" // Add sizes for optimization
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay effect */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                         <svg className="w-8 h-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                         </svg>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-2 sm:p-4 bg-transparent border-none shadow-none"> {/* Adjusted dialog content style */}
                   <Image
                     src={image.path}
                     alt={image.alt || `Testimonial ${image.id} full view`}
                     width={1200} // Provide width/height for non-fill images
                     height={800}
                     className="rounded-lg object-contain max-h-[80vh] w-auto mx-auto" // Ensure image fits
                   />
                   {/* Optional: Add a close button if needed, though clicking outside usually closes */}
                   {/* <DialogClose asChild>
                     <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white bg-black/30 hover:bg-black/50">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                     </Button>
                   </DialogClose> */}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Removed old ImageLightbox component */}
    </div>
  );
}
