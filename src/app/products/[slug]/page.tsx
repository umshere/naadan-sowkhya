import productsData from "@/data/products.json";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetailsEnhanced";

type Props = {
  params: {
    slug: Promise<string> | string;
  };
};

// Generate metadata for the product page
export async function generateMetadata({ params }: Props) {
  const slug = await params.slug;
  const product = productsData.products.find((p) => p.slug === slug);

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

// Product page component
export default async function ProductPage({ params }: Props) {
  const slug = await params.slug;
  const product = productsData.products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
