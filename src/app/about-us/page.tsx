import Image from 'next/image';
import Link from 'next/link';

// Import data
import aboutData from '@/data/about.json';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary-color">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-primary-color">About Us</span>
        </div>
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-color mb-4">About Us</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Learn more about NAADAN SOWKHYA, our mission, vision, and the people behind our natural products.
          </p>
        </div>
        
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Mission */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary-color mb-4">{aboutData.mission.title}</h2>
            <p className="text-gray-700">{aboutData.mission.description}</p>
          </div>
          
          {/* Vision */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary-color mb-4">{aboutData.vision.title}</h2>
            <p className="text-gray-700">{aboutData.vision.description}</p>
          </div>
        </div>
        
        {/* Founder */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={aboutData.founder.image}
                alt={aboutData.founder.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary-color mb-2">About Founder</h2>
              <h3 className="text-2xl font-semibold text-secondary-color mb-4">{aboutData.founder.name}</h3>
              <div className="text-gray-700 space-y-4">
                {aboutData.founder.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary-color mb-8">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-color mb-2">Quality</h3>
              <p className="text-gray-600">We prioritize quality and purity in everything we offer.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-color mb-2">Sustainability</h3>
              <p className="text-gray-600">We are committed to environmental stewardship and sustainable practices.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-color mb-2">Community</h3>
              <p className="text-gray-600">We're a community united by a shared commitment to holistic wellness.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-color mb-2">Integrity</h3>
              <p className="text-gray-600">We prioritize transparency, integrity, and sustainability in every step.</p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary-color text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Join us in embracing a lifestyle that celebrates the harmony between humanity and nature</h2>
          <p className="mb-6 max-w-3xl mx-auto">Together, let's make a positive impact. Welcome to NAADAN SOWKHYA.</p>
          <Link href="/product_category/natural-hair-care" className="btn bg-white text-primary-color hover:bg-gray-100">
            Explore Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}