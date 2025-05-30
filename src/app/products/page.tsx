'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link'; // Removed unused import
import { ViewToggle, type ViewMode } from '@/components/ui/ViewToggle';
import ProductCard from '@/components/ui/ProductCard';
import { ProductListItem } from '@/components/ui/ProductListItem';
import { ProductCompactCard } from '@/components/ui/ProductCompactCard';
import categoriesData from '@/data/categories.json';
import { getAllProducts, FullProduct, getCategoryName } from '@/lib/productUtils'; // Import utility, type, and getCategoryName

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [isSortExpanded, setIsSortExpanded] = useState(false);
  const [allProcessedProducts, setAllProcessedProducts] = useState<FullProduct[]>([]);

  // Load processed products and saved view preference
  useEffect(() => {
    setAllProcessedProducts(getAllProducts()); // Get processed products

    const savedView = localStorage.getItem('productViewMode');
    if (savedView) {
      setViewMode(savedView as ViewMode);
    }
  }, []);

  // Save view preference
  const handleViewChange = (view: ViewMode) => {
    setViewMode(view);
    localStorage.setItem('productViewMode', view);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products using processed data
  let displayProducts = selectedCategory
    ? allProcessedProducts.filter(product => 
        product.category.includes(selectedCategory) // Use category array
      )
    : allProcessedProducts;

  if (sortBy) {
    displayProducts = [...displayProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return Number(a.price) - Number(b.price);
        case 'price-desc':
          return Number(b.price) - Number(a.price);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }

  const toggleFilter = () => {
    setIsFilterExpanded(!isFilterExpanded);
    if (!isFilterExpanded) {
      setIsSortExpanded(false); // Close sort menu when opening filter
    }
  };

  const toggleSort = () => {
    setIsSortExpanded(!isSortExpanded);
    if (!isSortExpanded) {
      setIsFilterExpanded(false); // Close filter menu when opening sort
    }
  };

  const handleCategorySelect = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setIsFilterExpanded(false);
  };

  const handleSort = (sortType: string) => {
    setSortBy(sortType);
    setIsSortExpanded(false); // Close sort dropdown after selection on mobile
  };

  // Get active sort text
  const getActiveSortText = () => {
    switch (sortBy) {
      case 'price-asc':
        return 'Price: Low to High';
      case 'price-desc':
        return 'Price: High to Low';
      case 'name-asc':
        return 'Name: A-Z';
      case 'name-desc':
        return 'Name: Z-A';
      default:
        return 'Sort by';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gray-50 py-12 md:py-16"
      >
        <div className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-primary-color"
            >
              Our Products
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl font-medium mb-4 leading-relaxed text-primary-color"
            >
              Discover our range of natural and preservative-free products
            </motion.p>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="w-32 h-1 bg-primary-color/30 mx-auto rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Category Filter & Sort Controls - Optimized for Mobile */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="container mx-auto px-4 py-2" // Reduced padding
        >
          {/* Mobile Filter & Sort Buttons - More Compact Layout */}
          <div className="md:hidden w-full flex justify-between gap-2 mb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFilter}
              className={`px-4 py-2 rounded-full text-sm font-medium flex-1 
                ${isFilterExpanded 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200'}`}
            >
              {selectedCategory ? categoriesData.categories.find(c => c.slug === selectedCategory)?.name : 'All Products'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSort}
              className={`px-4 py-2 rounded-full text-sm font-medium flex-1
                ${isSortExpanded
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 border border-gray-200'}`}
            >
              {getActiveSortText()}
            </motion.button>
            
            {/* View Toggle in Mobile - Add directly to header bar */}
            <div className="self-center">
              <ViewToggle currentView={viewMode} onViewChange={handleViewChange} />
            </div>
          </div>

          {/* Desktop Filters - Always visible */}
          <div className="hidden md:flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategorySelect(null)}
              className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-300
                ${!selectedCategory
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }`}
            >
              All Products
            </motion.button>
            {categoriesData.categories.map((category) => (
              <motion.button
                key={category.slug}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategorySelect(category.slug)}
                className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-300
                  ${selectedCategory === category.slug
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                  }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile Filters - Expandable */}
          <AnimatePresence>
            {isFilterExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden flex flex-col gap-2 mt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategorySelect(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full
                    ${!selectedCategory
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  All Products
                </motion.button>
                {categoriesData.categories.map((category) => (
                  <motion.button
                    key={category.slug}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategorySelect(category.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full
                      ${selectedCategory === category.slug
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                      }`}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Sort Options - Expandable */}
          <AnimatePresence>
            {isSortExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden flex flex-col gap-2 mt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSort('price-asc')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full
                    ${sortBy === 'price-asc'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  Price: Low to High
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSort('price-desc')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full
                    ${sortBy === 'price-desc'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  Price: High to Low
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSort('name-asc')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full
                    ${sortBy === 'name-asc'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  Name: A-Z
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSort('name-desc')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full
                    ${sortBy === 'name-desc'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                >
                  Name: Z-A
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Sort Controls */}
          <div className="mt-4 hidden md:flex flex-wrap justify-center gap-2">
            <span className="text-sm text-gray-500 self-center">Sort by:</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSort('price-asc')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === 'price-asc'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Price: Low to High
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSort('price-desc')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === 'price-desc'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Price: High to Low
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSort('name-asc')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === 'name-asc'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Name: A-Z
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSort('name-desc')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                sortBy === 'name-desc'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Name: Z-A
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* View Toggle - Only for desktop now since we moved it to header for mobile */}
      <div className="container mx-auto px-4 py-4 hidden md:flex justify-end">
        <ViewToggle currentView={viewMode} onViewChange={handleViewChange} />
      </div>

      {/* Products Display */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="container mx-auto px-4 py-8"
      >
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' && (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {displayProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    image={product.image || '/images/placeholder.jpg'}
                    price={product.price?.toString() || '0'}
                    currency={product.currency || '₹'}
                    whatsappLink={product.whatsappLink || `https://wa.me/?text=I'm interested in ${product.name}`}
                    category={product.category.length > 0 ? getCategoryName(product.category[0]) : 'Uncategorized'} // Pass first category name
                  />
                ))}
              </motion.div>
            )}

            {viewMode === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                {displayProducts.map((product) => (
                  <ProductListItem
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    image={product.image || '/images/placeholder.jpg'}
                    price={product.price?.toString() || '0'}
                    currency={product.currency || '₹'}
                    whatsappLink={product.whatsappLink || `https://wa.me/?text=I'm interested in ${product.name}`}
                    category={product.category.length > 0 ? getCategoryName(product.category[0]) : 'Uncategorized'} // Pass first category name
                  />
                ))}
              </motion.div>
            )}

            {viewMode === 'compact' && (
              <motion.div
                key="compact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
              >
                {displayProducts.map((product) => (
                  <ProductCompactCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    image={product.image || '/images/placeholder.jpg'}
                    price={product.price?.toString() || '0'}
                    currency={product.currency || '₹'}
                    whatsappLink={product.whatsappLink || `https://wa.me/?text=I'm interested in ${product.name}`}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {!isLoading && displayProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No products found in this category.</p>
            <button
              onClick={() => handleCategorySelect(null)}
              className="px-6 py-3 bg-primary-color text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              View All Products
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
