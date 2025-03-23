import Image from 'next/image';
import Link from 'next/link';

// Import data
import aboutData from '@/data/about.json';

export default function AboutCEOPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary-color">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/about-us" className="text-gray-500 hover:text-primary-color">
            About Us
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-primary-color">About CEO</span>
        </div>
        
        {/* CEO Profile */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-color mb-4">About Our Founder</h1>
            <p className="text-gray-600">
              Meet the visionary behind NAADAN SOWKHYA
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/3 relative h-[300px] md:h-auto">
                <Image
                  src={aboutData.founder.image}
                  alt={aboutData.founder.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <h2 className="text-3xl font-bold text-primary-color mb-2">{aboutData.founder.name}</h2>
                <p className="text-gray-600 italic mb-6">Founder & CEO, NAADAN SOWKHYA</p>
                
                <div className="text-gray-700 space-y-4">
                  {aboutData.founder.description.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-primary-color mb-4">{aboutData.mission.title}</h2>
              <p className="text-gray-700">{aboutData.mission.description}</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-primary-color mb-4">{aboutData.vision.title}</h2>
              <p className="text-gray-700">{aboutData.vision.description}</p>
            </div>
          </div>
          
          {/* Journey */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-primary-color mb-8">Our Journey</h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-color"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-7 h-7 rounded-full border-4 border-primary-color bg-white"></div>
                  <div className="ml-auto mr-auto w-1/2 pr-8 md:pr-16 text-right">
                    <h3 className="text-xl font-bold text-secondary-color mb-2">2009</h3>
                    <p className="text-gray-700">Completed Master of Business Administration from Calicut University</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-7 h-7 rounded-full border-4 border-primary-color bg-white"></div>
                  <div className="ml-auto mr-auto w-1/2 pl-8 md:pl-16 ml-auto">
                    <h3 className="text-xl font-bold text-secondary-color mb-2">2010-2016</h3>
                    <p className="text-gray-700">Worked for Saipem Angola – Africa, gaining international business experience</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-7 h-7 rounded-full border-4 border-primary-color bg-white"></div>
                  <div className="ml-auto mr-auto w-1/2 pr-8 md:pr-16 text-right">
                    <h3 className="text-xl font-bold text-secondary-color mb-2">2017</h3>
                    <p className="text-gray-700">Completed villa projects and started the new beginning of non-preservative food and non-chemical products</p>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-7 h-7 rounded-full border-4 border-primary-color bg-white"></div>
                  <div className="ml-auto mr-auto w-1/2 pl-8 md:pl-16 ml-auto">
                    <h3 className="text-xl font-bold text-secondary-color mb-2">2017-Present</h3>
                    <p className="text-gray-700">Established NAADAN SOWKHYA, selling natural products in different countries including India, Malaysia, and United Arab Emirates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="bg-primary-color text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Experience the NAADAN SOWKHYA Difference</h2>
            <p className="mb-6">Discover our range of natural, preservative-free products crafted with care and commitment to quality.</p>
            <Link href="/product_category/natural-hair-care" className="btn bg-white text-primary-color hover:bg-gray-100">
              Explore Our Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}