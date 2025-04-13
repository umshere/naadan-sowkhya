import config from "@/data/config.json";
import products from "@/data/products.json";
import newProducts from "@/data/new-products.json";

export interface Product {
  id: string;
  name: string;
  category: string[];
  price: string;
  weight?: string;
  description: string;
  image: string;
}

export interface FullProduct extends Product {
  currency: string;
  benefits: string;
  ingredients: string;
  whatsappLink: string;
  slug: string;
}

export function getProductDetails(product: Product): FullProduct {
  return {
    ...product,
    currency: config.defaults.currency,
    benefits: config.defaults.benefits,
    ingredients: config.defaults.ingredients,
    // Ensure image path includes /images/products/
    image: `/images/products/${product.image}`,
    slug: product.id,
    whatsappLink: `https://wa.me/${
      config.defaults.whatsappNumber
    }?text=Hi,%20i%20would%20like%20to%20order%20${encodeURIComponent(
      product.name
    )}`,
  };
}

export function getAllProducts(): FullProduct[] {
  return products.products.map(getProductDetails);
}

export function getFeaturedProducts(): FullProduct[] {
  return newProducts.featured
    .map((id) => products.products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined)
    .map(getProductDetails);
}

export function getProductBySlug(slug: string): FullProduct | undefined {
  const product = products.products.find((p) => p.id === slug);
  return product ? getProductDetails(product) : undefined;
}

export function getProductsByCategory(category: string): FullProduct[] {
  return products.products
    .filter((p) => p.category.includes(category))
    .map(getProductDetails);
}

export function getCategoryName(categoryId: string): string {
  return (
    config.categories[categoryId as keyof typeof config.categories] ||
    categoryId
  );
}

export function getAllCategories(): { id: string; name: string }[] {
  return Object.entries(config.categories).map(([id, name]) => ({ id, name }));
}
