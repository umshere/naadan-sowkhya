import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FullProduct } from '@/lib/productUtils';

interface Props {
  product: FullProduct;
}

export default function ProductCardCompact({ product }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
  );
}
