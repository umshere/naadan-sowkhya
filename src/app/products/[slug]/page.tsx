import React from 'react';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ui/ProductDetails';
import productsData from '@/data/products.json';

// Simple type for generateStaticParams return values
type Params = {
  slug: string;
};

// Use any for metadata function parameters as well
export async function generateMetadata({ params }: any) {
  const product = productsData.products.find(p => p.slug === params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - Naadan Sowkhya`,
    description: product.description,
  };
}

// Remove type annotations and let Next.js infer them
export default async function ProductPage({ params }: any) {
  const { slug } = params;
  const product = productsData.products.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails {...product} />;
}

export function generateStaticParams(): Params[] {
  return productsData.products.map((product) => ({
    slug: product.slug,
  }));
}
