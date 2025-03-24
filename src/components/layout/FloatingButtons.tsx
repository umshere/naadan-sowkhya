'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa';

const FloatingButtons = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    
    // Handle scroll for minimizing buttons
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsMinimized(scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleEnquiry = () => {
    setIsEnquiryOpen(!isEnquiryOpen);
  };

  const buttonStyles = `flex items-center justify-center rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${
    isMinimized ? 'w-10 h-10 md:w-12 md:h-12 opacity-70 hover:opacity-100' : 'w-14 h-14 md:w-14 md:h-14'
  }`;

  return (
    <>
      <div className={`fixed bottom-6 z-50 flex flex-col space-y-4 transition-all duration-300 ${
        isMinimized ? 'right-2 md:right-4' : 'right-6'
      }`}>
        <AnimatePresence>
          {isVisible && (
            <>
              {/* WhatsApp Button */}
              <motion.a
                href="https://wa.me/919846981231"
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonStyles} bg-[#25D366] group`}
                aria-label="Contact us on WhatsApp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <FaWhatsapp className={`transition-transform group-hover:scale-110 ${
                  isMinimized ? 'w-5 h-5 md:w-6 md:h-6' : 'w-7 h-7'
                } text-white`} />
              </motion.a>

              {/* Call Button */}
              <motion.a
                href="tel:9846981231"
                className={`${buttonStyles} bg-[#4CAF50] group`}
                aria-label="Call us"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <FaPhone className={`transition-transform group-hover:scale-110 ${
                  isMinimized ? 'w-5 h-5 md:w-6 md:h-6' : 'w-7 h-7'
                } text-white`} />
              </motion.a>

              {/* Enquiry Button */}
              <motion.button
                onClick={toggleEnquiry}
                className={`${buttonStyles} bg-[#2196F3] group`}
                aria-label="Send an enquiry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                <FaEnvelope className={`transition-transform group-hover:scale-110 ${
                  isMinimized ? 'w-5 h-5 md:w-6 md:h-6' : 'w-7 h-7'
                } text-white`} />
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Enquiry Form Modal */}
      <AnimatePresence>
        {isEnquiryOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <button
                onClick={toggleEnquiry}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close enquiry form"
              >
                <FaTimes size={24} />
              </button>
              
              <h2 className="text-2xl font-bold text-primary-color mb-4">Send us a message</h2>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    placeholder="Your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    placeholder="Your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full bg-primary-color text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingButtons;