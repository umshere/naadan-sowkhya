import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Import data
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

interface ProductPageProps {
  params: {
    product: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export function generateStaticParams() {
  return productsData.products.map((product) => ({
    product: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = params;
  
  // Find the product
  const productData = productsData.products.find(
    (prod) => prod.slug === product
  );
  
  // If product not found, return 404
  if (!productData) {
    notFound();
  }
  
  // Find the category
  const category = categoriesData.categories.find(
    (cat) => cat.id === productData.category
  );
  
  // Find similar products (same category, excluding current product)
  const similarProducts = productsData.products
    .filter(
      (prod) => prod.category === productData.category && prod.id !== productData.id
    )
    .slice(0, 4); // Limit to 4 similar products
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary-color">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link 
            href={`/product_category/${category?.slug}`} 
            className="text-gray-500 hover:text-primary-color"
          >
            {category?.name || 'Products'}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-primary-color">{productData.name}</span>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={productData.image}
              alt={productData.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-primary-color mb-4">
              {productData.name}
            </h1>
            
            {productData.price && (
              <p className="text-2xl font-bold text-secondary-color mb-6">
                {productData.currency} {productData.price}
              </p>
            )}
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{productData.description}</p>
            </div>
            
            {productData.benefits && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Benefits</h2>
                <p className="text-gray-700">{productData.benefits}</p>
              </div>
            )}
            
            {productData.ingredients && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <p className="text-gray-700">{productData.ingredients}</p>
              </div>
            )}
            
            <a
              href={productData.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center justify-center px-6 py-3 rounded-md text-white font-medium"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order Now
            </a>
          </div>
        </div>
        
        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-primary-color mb-8">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link href={`/our_products/${product.slug}`}>
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/our_products/${product.slug}`}>
                      <h3 className="text-lg font-semibold text-secondary-color hover:text-primary-color transition-colors mb-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {product.price && (
                      <p className="text-gray-700 font-bold mb-3">
                        {product.currency} {product.price}
                      </p>
                    )}
                    
                    <a
                      href={product.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp w-full text-center py-2 px-4 rounded-md inline-block"
                    >
                      Order Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
