'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaLeaf, 
  FaInfoCircle, 
  FaUserFriends,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export default function MobileNavigation() {
  const pathname = usePathname();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Navigation items
  const navItems: NavItem[] = [
    { name: 'Home', path: '/', icon: <FaHome size={20} /> },
    { name: 'Products', path: '/our_products', icon: <FaLeaf size={20} /> },
    { name: 'About', path: '/about-us', icon: <FaInfoCircle size={20} /> },
    { name: 'Contact', path: '/contact', icon: <FaUserFriends size={20} /> }
  ];
  
  useEffect(() => {
    // Control visibility of bottom nav based on scroll direction
    const controlNavbar = () => {
      if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  // Close menu if Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);
  
  return (
    <>
      {/* Bottom Navigation for mobile */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center text-xs w-1/5 h-full",
                pathname === item.path
                  ? "text-primary-color"
                  : "text-gray-500"
              )}
            >
              <div className="mb-1">
                {item.icon}
              </div>
              <span>{item.name}</span>
              {pathname === item.path && (
                <motion.div 
                  className="absolute bottom-0 w-10 h-1 bg-primary-color rounded-t-md"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
          
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center text-xs w-1/5 h-full text-gray-500"
          >
            <div className="mb-1">
              <FaBars size={20} />
            </div>
            <span>Menu</span>
          </button>
        </div>
      </motion.div>
      
      {/* Full screen menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 md:hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              {/* Menu header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              
              {/* Menu items */}
              <div className="flex-1 overflow-y-auto pt-4">
                <div className="px-4 pb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">MAIN NAVIGATION</h3>
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-lg",
                          pathname === item.path
                            ? "bg-gray-100 text-primary-color"
                            : "text-gray-800 hover:bg-gray-50"
                        )}
                      >
                        <div className="mr-4">{item.icon}</div>
                        <span className="text-base">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 mt-2 pt-4 px-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">CATEGORIES</h3>
                  <div className="space-y-1">
                    <Link 
                      href="/product_category/ayurvedic" 
                      className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-gray-50"
                    >
                      <span className="text-base">Ayurvedic</span>
                    </Link>
                    <Link 
                      href="/product_category/wellness" 
                      className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-gray-50"
                    >
                      <span className="text-base">Wellness</span>
                    </Link>
                    <Link 
                      href="/product_category/traditional" 
                      className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-gray-50"
                    >
                      <span className="text-base">Traditional</span>
                    </Link>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 mt-2 pt-4 px-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">COMPANY</h3>
                  <div className="space-y-1">
                    <Link 
                      href="/gallery" 
                      className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-gray-50"
                    >
                      <span className="text-base">Gallery</span>
                    </Link>
                    <Link 
                      href="/testimonials" 
                      className="flex items-center px-4 py-3 rounded-lg text-gray-800 hover:bg-gray-50"
                    >
                      <span className="text-base">Testimonials</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Menu footer */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-500 mb-2">© 2024 Naadan Sowkhya</p>
                  <div className="flex space-x-4 mt-2">
                    <Link 
                      href="https://facebook.com" 
                      className="text-gray-500 hover:text-primary-color"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </Link>
                    <Link 
                      href="https://instagram.com" 
                      className="text-gray-500 hover:text-primary-color"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}