import React from 'react';
import { getAllProducts, getCategoryName } from '@/lib/productUtils';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface PageProps {
  params: { category: string };
}

// Generate metadata for each category page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categoryName = getCategoryName(params.category);
  
  return {
    title: `${categoryName} - Naadan Sowkhya`,
    description: `Browse our collection of ${categoryName.toLowerCase()} products. Natural and authentic products from Naadan Sowkhya.`
  };
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const products = getAllProducts();
  const categories = Array.from(
    new Set(products.flatMap(product => product.category))
  );
  
  return categories.map((category) => ({
    category: category,
  }));
}

export default function CategoryPage({ params }: PageProps) {
  const products = getAllProducts().filter(product =>
    product.category.includes(params.category)
  );

  // Default sort by name
  const sortedProducts = [...products].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const categoryName = getCategoryName(params.category);

  const breadcrumbItems = [
    {
      label: 'Products',
      href: '/products'
    },
    {
      label: categoryName
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {categoryName}
          </h1>
          <p className="text-gray-600">
            {sortedProducts.length} Products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative h-64 w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-green-600 font-semibold">
                    {product.currency} {product.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">
              No products found in this category
            </h2>
            <p className="mt-2 text-gray-500">
              Please check back later or browse other categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
