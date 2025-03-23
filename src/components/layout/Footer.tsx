'use client';

import Link from 'next/link';
import Image from 'next/image';

// Import data
import contactData from '@/data/contact.json';
import homepageData from '@/data/homepage.json';

const Footer = () => {
  // Get the first 4 gallery images for the footer preview
  const galleryPreviewImages = homepageData.gallery.images.slice(0, 4);

  return (
    <footer className="bg-[#f0f7ff] text-gray-800 pt-16 pb-0 relative overflow-hidden">
      {/* Wave Background */}
      <div className="absolute bottom-0 left-0 w-full h-40 overflow-hidden z-0">
        <svg 
          viewBox="0 0 1440 320" 
          className="absolute bottom-0 w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            fill="#2A6D3C" 
            fillOpacity="0.8" 
            d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
          <path 
            fill="#2A6D3C" 
            fillOpacity="0.5" 
            d="M0,288L80,272C160,256,320,224,480,213.3C640,203,800,213,960,213.3C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* NAADAN SOWKHYA Section */}
          <div>
            <h3 className="text-xl font-bold text-primary-color mb-4 pb-2 border-b border-tertiary-color">
              NAADAN SOWKHYA
            </h3> 
            <p className="mb-6 text-gray-700">
              Natural products free from preservatives and artificial colours or chemicals that may be harmful to human health.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-primary-color mb-4 pb-2 border-b border-tertiary-color">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-700 hover:text-primary-color transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-tertiary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-700 hover:text-primary-color transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-tertiary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/product_category/natural-hair-care" className="text-gray-700 hover:text-primary-color transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-tertiary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Natural Hair Care
                </Link>
              </li>
              <li>
                <Link href="/product_category/food-products" className="text-gray-700 hover:text-primary-color transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-tertiary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Food Products
                </Link>
              </li>
              <li>
                <Link href="/product_category/natural-cosmetics" className="text-gray-700 hover:text-primary-color transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-tertiary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Cosmetics & Herbal Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-primary-color transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-tertiary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us with Map */}
          <div>
            <h3 className="text-xl font-bold text-primary-color mb-4 pb-2 border-b border-tertiary-color">
              Contact Us
            </h3> 
            <div className="mb-4 space-y-3">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-primary-color flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">
                  {contactData.address}
                </span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${contactData.phone}`} className="text-gray-700 hover:text-primary-color transition-colors">
                  {contactData.phone}
                </a>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-primary-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${contactData.email}`} className="text-gray-700 hover:text-primary-color transition-colors">
                  {contactData.email}
                </a>
              </div>
            </div>
            
            {/* Map */}
            <div className="h-40 rounded-md overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15683.573383045079!2d76.0028145!3d10.665386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba795eba226e445%3A0x5634d2cdac72799a!2sSowkhya%20100%25%20Natural%20%26%20Herbal%20Products!5e0!3m2!1sen!2ssa!4v1710173945018!5m2!1sen!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sowkhya Location"
              ></iframe>
            </div>
            <div className="mt-2 text-xs text-right">
              <a 
                href="https://www.google.com/maps/place/Sowkhya%20100%25%20Natural%20%26%20Herbal%20Products/@10.665386,76.0028145,17z/data=!3m1!4b1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[var(--primary-color)] hover:underline"
              >
                View larger map
              </a>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="text-xl font-bold text-primary-color mb-4 pb-2 border-b border-tertiary-color">
              Gallery
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {galleryPreviewImages.map((image) => (
                <Link href="/gallery" key={image.id} className="block relative h-20 rounded-md overflow-hidden group">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary-color bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center pb-16 relative z-10">
          <p className="text-white font-medium">
            &copy; {new Date().getFullYear()} NAADAN SOWKHYA. All rights reserved.
          </p>
          <p className="text-white text-sm mt-1 opacity-80">
            Natural products free from preservatives and artificial colours or chemicals
          </p>
        </div>
      </div>
      
      {/* WhatsApp floating button */}
      {/* Single WhatsApp floating button in bottom right corner */}
      <a 
        href={contactData.whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
        aria-label="Contact us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z"/>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
