import { Metadata } from "next";
import productsData from "@/data/products.json";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetailsEnhanced";

// Simple type for generateStaticParams
type Params = {
  slug: string;
};

// Generate metadata with any type to avoid type conflicts
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const product = productsData.products.find(p => p.slug === params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | Sowkhya Natural Products`,
    description: product.description,
  };
}

// Product page component with any type for params
export default async function ProductPage({ params }: any) {
  const { slug } = params;
  const product = productsData.products.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}

// Add generateStaticParams for static site generation
export function generateStaticParams(): Params[] {
  return productsData.products.map((product) => ({
    slug: product.slug,
  }));
}
