import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ui/ProductDetails';
import productsData from '@/data/products.json';

interface Props {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props) {
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

export default function ProductPage({ params }: Props) {
  const product = productsData.products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails {...product} />;
}

// Generate static paths for all products
export async function generateStaticParams() {
  return productsData.products.map((product) => ({
    slug: product.slug,
  }));
}
