'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaPhone, 
  FaEnvelope, 
  FaFacebook, 
  FaInstagram,
  FaTimes
} from 'react-icons/fa';
import { 
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
} from '@/components/ui/drawer';

// Contact options data
const contactOptions = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/919846981231?text=Hi%20Naadan%20Sowkhya%2C%20I%20want%20to%20know%20more%20about%20your%20products',
    icon: <FaWhatsapp className="h-5 w-5" />,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    id: 'phone',
    label: 'Call Us',
    href: 'tel:+919846981231',
    icon: <FaPhone className="h-5 w-5" />,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:naadansowkhya@gmail.com',
    icon: <FaEnvelope className="h-5 w-5" />,
    color: 'bg-red-500 hover:bg-red-600',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/NaadanSowkhya',
    icon: <FaFacebook className="h-5 w-5" />,
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/naadansowkhya/',
    icon: <FaInstagram className="h-5 w-5" />,
    color: 'bg-pink-600 hover:bg-pink-700',
  },
];

export default function ContactOptionsDrawer() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleOpenDrawer = () => setOpen(true);
    document.addEventListener('openContactDrawer', handleOpenDrawer);
    return () => document.removeEventListener('openContactDrawer', handleOpenDrawer);
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <motion.button
          className="fixed bottom-20 right-4 z-40 rounded-full bg-primary text-white p-3 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          data-drawer-trigger="contact"
        >
          <FaEnvelope className="h-6 w-6" />
        </motion.button>
      </DrawerTrigger>
      
      <DrawerContent className="max-h-[85vh] overflow-auto">
        <DrawerHeader className="border-b border-gray-200">
          <DrawerTitle className="text-center text-xl">Contact Us</DrawerTitle>
        </DrawerHeader>
        
        <div className="grid gap-4 p-6">
          {contactOptions.map((option) => (
            <motion.a
              key={option.id}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between p-4 rounded-lg text-white ${option.color} shadow-md`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                {option.icon}
                <span className="font-medium">{option.label}</span>
              </div>
              <div className="h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
        
        <DrawerFooter className="border-t border-gray-200 pt-2">
          <DrawerClose asChild>
            <button className="mx-auto flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900">
              <FaTimes className="h-4 w-4" />
              <span>Close</span>
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
