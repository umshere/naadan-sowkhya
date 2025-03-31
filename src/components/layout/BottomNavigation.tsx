'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaLeaf, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import ContactOptionsDrawer from '../ui/ContactOptionsDrawer';
import { Drawer } from '../ui/drawer';

const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: <FaHome className="h-5 w-5" />,
  },
  {
    label: 'Products',
    href: '/products', // Updated from '/our_products' to '/products'
    icon: <FaLeaf className="h-5 w-5" />,
  },
  {
    label: 'About',
    href: '/about-us',
    icon: <FaInfoCircle className="h-5 w-5" />,
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: <FaEnvelope className="h-5 w-5" />,
    isContactTrigger: true,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handle scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      
      // Show/hide based on scroll direction and position
      // Always show when at top of page
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (scrollingDown && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <ContactOptionsDrawer />
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="bottom-navigation"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            <nav className="bg-white border-t border-gray-200 shadow-bottom-nav px-2 py-2">
              <div className="flex items-center justify-around">
                {navItems.map((item) => {
                  const isActive = item.href === pathname || 
                                  (item.href !== '/' && pathname.startsWith(item.href));
                  
                  // Special handling for contact trigger
                  if (item.isContactTrigger) {
                    return (
                      <div
                        key={item.href}
                        onClick={() => {
                          document.dispatchEvent(new CustomEvent('openContactDrawer'))
                        }}
                        className="flex flex-col items-center justify-center py-2 px-3 text-green-600 hover:text-green-800 cursor-pointer"
                      >
                        <div className="relative">
                          {item.icon}
                          <motion.div
                            className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"
                            animate={{ 
                              scale: [1, 1.2, 1],
                            }}
                            transition={{ 
                              repeat: Infinity,
                              repeatType: "reverse",
                              duration: 1,
                              repeatDelay: 1
                            }}
                          />
                        </div>
                        <span className="text-xs mt-1">{item.label}</span>
                      </div>
                    );
                  }
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex flex-col items-center justify-center py-2 px-3",
                        isActive 
                          ? "text-primary" 
                          : "text-gray-600 hover:text-primary"
                      )}
                    >
                      {item.icon}
                      <motion.span 
                        className={cn(
                          "text-xs mt-1",
                          isActive && "font-medium"
                        )}
                        animate={{ scale: isActive ? 1.05 : 1 }}
                      >
                        {item.label}
                      </motion.span>
                      {isActive && (
                        <motion.div
                          layoutId="bottomNavIndicator"
                          className="absolute -bottom-2 h-1 w-8 bg-primary rounded-t-full"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
