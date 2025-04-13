import Image from 'next/image';
import products from '@/data/products.json';
import { getProductBySlug } from '@/lib/productUtils';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface PageProps {
  params: { slug: string };
}

// Generate metadata for each product page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found - Naadan Sowkhya'
    };
  }

  return {
    title: `${product.name} - Naadan Sowkhya`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Naadan Sowkhya`,
      description: product.description,
      images: [product.image]
    }
  };
}

// Generate static paths for all products
export async function generateStaticParams() {
  const productSlugs = products.products.map((product) => ({
    slug: product.id,
  }));
  return productSlugs;
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
        <p>The requested product could not be found.</p>
      </div>
    );
  }

  const breadcrumbItems = [
    {
      label: 'Products',
      href: '/products'
    },
    {
      label: product.category[0],
      href: `/product_category/${product.category[0]}`
    },
    {
      label: product.name
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[400px] md:h-[600px] w-full bg-white rounded-lg shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="p-4"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="space-y-4">
              <p className="text-xl font-semibold">
                {product.currency} {product.price}
              </p>
              {product.weight && (
                <p className="text-gray-600">Weight/Volume: {product.weight}</p>
              )}
              <p className="text-gray-600">{product.description}</p>
              {product.benefits && (
                <div>
                  <h2 className="text-xl font-semibold mt-4 mb-2">Benefits</h2>
                  <p>{product.benefits}</p>
                </div>
              )}
              {product.ingredients && (
                <div>
                  <h2 className="text-xl font-semibold mt-4 mb-2">Ingredients</h2>
                  <p>{product.ingredients}</p>
                </div>
              )}
              <div className="mt-8">
                <a
                  href={product.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg inline-flex items-center hover:bg-green-600 transition-colors"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
