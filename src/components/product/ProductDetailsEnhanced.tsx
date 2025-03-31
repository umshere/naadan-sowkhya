'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: string;
  currency: string;
  description: string;
  benefits: string;
  ingredients: string;
  whatsappLink: string;
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={imageError ? '/images/placeholder.jpg' : product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onError={() => setImageError(true)}
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-4"
              >
                {product.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center rounded-full bg-primary-color/10 px-3 py-1 text-sm font-medium text-primary-color mb-4 self-start"
              >
                {product.category}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-700 mb-6"
              >
                {product.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.currency} {product.price}
                  </span>
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                    asChild
                  >
                    <a
                      href={product.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <FaWhatsapp className="h-5 w-5" />
                      Order on WhatsApp
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Additional Information */}
              {(product.benefits || product.ingredients) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="border-t pt-6 mt-6"
                >
                  {product.benefits && (
                    <div className="mb-4">
                      <h2 className="text-lg font-semibold mb-2">Benefits</h2>
                      <p className="text-gray-700">{product.benefits}</p>
                    </div>
                  )}
                  {product.ingredients && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Ingredients</h2>
                      <p className="text-gray-700">{product.ingredients}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
