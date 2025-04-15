"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

const CTASection = ({
  title = "Experience the NAADAN SOWKHYA Difference",
  description = "Discover our range of natural, preservative-free products crafted with care and commitment to quality.",
  buttonText = "Explore Our Products",
  buttonLink = "/product_category/natural-hair-care"
}: CTASectionProps) => {
  return (
    <div className="bg-primary rounded-lg text-white p-8 text-center shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-6">{description}</p>
      <Button asChild variant="secondary" className="hover:bg-white/90">
        <Link href={buttonLink}>{buttonText}</Link>
      </Button>
    </div>
  );
};

export default CTASection;
