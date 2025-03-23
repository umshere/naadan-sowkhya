'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaLeaf } from 'react-icons/fa';
import { Tab } from '@headlessui/react';
import productsData from '@/data/products.json';
import ProductCard from './ProductCard';

interface ProductDetailsProps {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  benefits?: string;
  ingredients?: string;
  image: string;
  gallery?: string[];
  price: string;
  currency: string;
  whatsappLink: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetails({
  id,
  name,
  slug,
  category,
  description,
  benefits,
  ingredients,
  image,
  gallery,
  price,
  currency,
  whatsappLink,
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(image);
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  // Format image paths
  const getImagePath = (imagePath: string): string => {
    if (imagePath?.startsWith('http')) {
      return imagePath;
    }
    
    if (imagePath?.includes('/images/')) {
      return imagePath;
    }
    
    if (imagePath && !imagePath.startsWith('/')) {
      return `/images/products/${imagePath}`;
    }
    
    return imagePath || '/images/placeholder.jpg';
  };

  // Handle gallery images
  const processedMainImage = getImagePath(image);
  const processedGallery = gallery 
    ? gallery.map(img => getImagePath(img))
    : [processedMainImage];
  
  if (!processedGallery.includes(processedMainImage)) {
    processedGallery.unshift(processedMainImage);
  }
  
  // Fallback image if main image fails to load
  const fallbackImage = "/images/placeholder.jpg";
  
  // Format price
  const formatPrice = (price: string | number): string => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    
    const numPrice = parseFloat(price);
    if (!isNaN(numPrice)) {
      return numPrice.toFixed(2);
    }
    
    return price.toString();
  };
  
  // Find similar products
  const similarProducts = productsData.products
    .filter(p => p.category === category && p.id !== id)
    .slice(0, 3);
    
  // Get categories for quick links
  const categories = Array.from(
    new Set(productsData.products.map(p => p.category))
  ).slice(0, 6);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images Column */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-2 order-2 md:order-1">
                {processedGallery.map((img, index) => (
                  <div 
                    key={index}
                    className={`border-2 rounded overflow-hidden cursor-pointer w-16 h-16 relative transition-all duration-200 ${selectedImage === img ? 'border-primary-color' : 'border-gray-200'}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`${name} thumbnail ${index}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                      onError={() => {
                        // If a thumbnail fails, replace it with fallback
                        processedGallery[index] = fallbackImage;
                      }}
                    />
                  </div>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="relative h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden order-1 md:order-2">
                <Image
                  src={imageError ? fallbackImage : selectedImage}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                  priority
                  onError={handleImageError}
                />
              </div>
            </div>
          </div>
          
          {/* Product Info Column */}
          <div className="flex flex-col space-y-6">
            <div>
              <div className="inline-block mb-2 px-3 py-1 bg-primary-color bg-opacity-20 text-primary-color rounded-full text-sm">
                {category}
              </div>
              <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
              <p className="text-2xl font-bold text-primary-color mt-2">
                {currency} {formatPrice(price)}
              </p>
            </div>
            
            <div>
              <a
                href={whatsappLink || `https://wa.me/?text=I'm interested in ${name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                <FaWhatsapp size={20} className="mr-2" />
                Contact via WhatsApp
              </a>
            </div>
            
            {/* Information Tabs */}
            <div className="mt-8 w-full">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        'w-full py-2.5 text-sm font-medium leading-5 rounded-lg',
                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary-color ring-primary-color ring-opacity-60',
                        selected
                          ? 'bg-white shadow text-primary-color'
                          : 'text-gray-600 hover:bg-white/[0.5] hover:text-primary-color'
                      )
                    }
                  >
                    Description
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        'w-full py-2.5 text-sm font-medium leading-5 rounded-lg',
                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary-color ring-primary-color ring-opacity-60',
                        selected
                          ? 'bg-white shadow text-primary-color'
                          : 'text-gray-600 hover:bg-white/[0.5] hover:text-primary-color'
                      )
                    }
                  >
                    Benefits
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        'w-full py-2.5 text-sm font-medium leading-5 rounded-lg',
                        'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary-color ring-primary-color ring-opacity-60',
                        selected
                          ? 'bg-white shadow text-primary-color'
                          : 'text-gray-600 hover:bg-white/[0.5] hover:text-primary-color'
                      )
                    }
                  >
                    Ingredients
                  </Tab>
                </Tab.List>
                <Tab.Panels className="mt-4">
                  <Tab.Panel className="p-3 bg-white rounded-xl">
                    <div className="prose prose-lg max-w-none">
                      {description ? (
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                      ) : (
                        <p>No description available for this product.</p>
                      )}
                    </div>
                  </Tab.Panel>
                  <Tab.Panel className="p-3 bg-white rounded-xl">
                    <div className="prose prose-lg max-w-none">
                      {benefits ? (
                        <div dangerouslySetInnerHTML={{ __html: benefits }} />
                      ) : (
                        <p>No benefits information available for this product.</p>
                      )}
                    </div>
                  </Tab.Panel>
                  <Tab.Panel className="p-3 bg-white rounded-xl">
                    <div className="prose prose-lg max-w-none">
                      {ingredients ? (
                        <div dangerouslySetInnerHTML={{ __html: ingredients }} />
                      ) : (
                        <p>No ingredients information available for this product.</p>
                      )}
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            
            {/* Quick Category Links */}
            <div className="mt-8 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <FaLeaf className="mr-2 text-primary-color" />
                Product Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, index) => (
                  <Link 
                    key={index} 
                    href={`/product_category/${cat.toLowerCase().replace(/ /g, '-')}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-primary-color hover:text-white text-sm rounded-full transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
