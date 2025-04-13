import products from '@/data/products.json';
import { getProductBySlug } from '@/lib/productUtils';

interface PageProps {
  params: { product: string };
}

// Generate static paths for all products
export async function generateStaticParams() {
  const productIds = products.products.map((product) => ({
    product: product.id,
  }));
  return productIds;
}

// Redirect to the products/[slug] page
export default function ProductPage({ params }: PageProps) {
  // Redirect to the main products page
  if (typeof window !== 'undefined') {
    window.location.href = `/products/${params.product}`;
  }

  // Return empty div for SSR
  return <div />;
}
