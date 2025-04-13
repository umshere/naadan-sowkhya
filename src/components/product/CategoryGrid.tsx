import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProducts, getCategoryName } from '@/lib/productUtils';

export default function CategoryGrid() {
  const products = getAllProducts();
  
  // Get all unique categories
  const categories = Array.from(
    new Set(products.flatMap(product => product.category))
  );

  // Group products by category
  const productsByCategory = categories.reduce((acc, category) => {
    acc[category] = products.filter(product => 
      product.category.includes(category)
    );
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              {getCategoryName(category)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsByCategory[category].map(product => (
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
          </div>
        ))}
      </div>
    </div>
  );
}
