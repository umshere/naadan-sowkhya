import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import AnimatedCategoryPage from '@/components/ui/AnimatedCategoryPage';
import AnimatedProductCard from '@/components/ui/AnimatedProductCard';

// Import data
import categoriesData from '@/data/categories.json';
import productsData from '@/data/products.json';

// Simple type for generateStaticParams return values
type Params = {
  category: string;
};

export function generateStaticParams(): Params[] {
  return categoriesData.categories.map((category) => ({
    category: category.slug,
  }));
}

// Remove type annotations and let Next.js infer them
export default async function CategoryPage({ params, searchParams }: any) {
  const { category } = params;
  
  // Use searchParams directly as it's now properly passed in
  const sortBy = searchParams?.sort as string | undefined;

  // Find the category
  const categoryData = categoriesData.categories.find(
    (cat) => cat.slug === category
  );

  // If category not found, return 404
  if (!categoryData) {
    notFound();
  }

  // Filter products by category and validate required fields
  const categoryProducts = productsData.products
    .filter(product => product.category?.split(' ').includes(category))
    .filter(product => {
      // Ensure required fields exist
      return product.id && product.name && product.slug;
    })
    .map(product => {
      // Ensure all required fields have default values if missing
      return {
        ...product,
        price: product.price || 0,
        currency: product.currency || '₹',
        image: product.image || '/images/placeholder.jpg',
        whatsappLink: product.whatsappLink || `https://wa.me/?text=I'm interested in ${product.name}`
      };
    });
  
  // Featured categories for quick navigation
  const featuredCategories = [
    { name: "Natural Hair Care", slug: "natural-hair-care" },
    { name: "Natural Cosmetics", slug: "natural-cosmetics" },
    { name: "Herbal Products", slug: "herbal-products" },
    { name: "Food Products", slug: "food-products" }
  ];
  
  // Sort products or apply filters based on searchParams
  let sortedProducts = [...categoryProducts];
  
  if (sortBy === 'price-asc') {
    sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sortBy === 'price-desc') {
    sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sortBy === 'name-asc') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'name-desc') {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }
  
  return (
    <AnimatedCategoryPage 
      category={category}
      featuredCategories={featuredCategories}
    >
      {/* Breadcrumbs */}
      <div className="mb-8 text-sm">
        <Link href="/" className="text-gray-500 hover:text-black-500">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-primary-color">Products</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-primary-color">{categoryData.name}</span>
      </div>
      
      {/* Category Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary-color mb-4">
          {categoryData.name}
        </h1>
        {categoryData.description && (
          <p className="text-gray-600 max-w-3xl mx-auto">
            {categoryData.description}
          </p>
        )}
        
        {/* Sorting controls - new modern addition */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-gray-500">Sort by:</span>
          <div className="flex flex-wrap gap-2">
            <Link 
              href={`/product_category/${category}?sort=price-asc`}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === 'price-asc' 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Price: Low to High
            </Link>
            <Link 
              href={`/product_category/${category}?sort=price-desc`}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === 'price-desc' 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Price: High to Low
            </Link>
            <Link 
              href={`/product_category/${category}?sort=name-asc`}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === 'name-asc' 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Name: A-Z
            </Link>
          </div>
        </div>
      </div>
      
      {/* Products Grid Content */}
      <>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <AnimatedProductCard key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                slug={product.slug}
                image={product.image}
                price={product.price.toString()}
                currency={product.currency}
                whatsappLink={product.whatsappLink}
                category={product.category}
              />
            </AnimatedProductCard>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
            <Link 
              href="/"
              className="mt-4 inline-block px-6 py-2 bg-primary-color text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </>
    </AnimatedCategoryPage>
  );
}
