import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/productUtils';

interface Props {
  className?: string;
}

export default function FeaturedProducts({ className = '' }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');
  const featuredProducts = getFeaturedProducts();

  // Get unique categories from all products, flattening the category arrays
  const categories = [
    'all',
    ...Array.from(
      new Set(
        featuredProducts.flatMap(product => product.category)
      )
    ),
  ];

  // Filter products by active category
  const filteredProducts = featuredProducts.filter(product =>
    activeCategory === 'all' ? true : product.category.includes(activeCategory)
  );

  return (
    <div className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
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
    </div>
  );
}
