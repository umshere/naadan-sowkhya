import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge'; // Import Badge component
import { getFeaturedProducts } from '@/lib/productUtils';

interface Props {
  className?: string;
  title: string;
  subtitle: string;
  productIds: any;
  allProducts: any;
  showAsCards: boolean;
}

export default function FeaturedProducts({ className = '', title, subtitle, productIds, allProducts, showAsCards }: Props) {
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
    <section className={`bg-section-bg py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Heading - match ProductCategories style */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 mb-2 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase">Featured Products</span>
          <h2 className="text-3xl font-serif font-bold text-primary-dark mb-2 tracking-tight">Featured Products</h2>
          <div className="mx-auto w-24 h-1 bg-primary rounded-full mb-2" />
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full font-bold text-sm transition-colors
                ${activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'}
              `}
              aria-label={`Filter by ${category}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
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
                  <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-brand-500 font-bold">
                    {product.currency} {product.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
