'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa';

const FloatingButtons = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const toggleEnquiry = () => {
    setIsEnquiryOpen(!isEnquiryOpen);
  };

  // Styles for all buttons
  const buttonStyles = "flex items-center justify-center rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl w-12 h-12";

  // Icon styles for all buttons
  const iconStyles = "w-6 h-6 text-white transition-transform group-hover:scale-110";

  return (
    <>
      <div
        className="fixed bottom-6 right-4 z-[1000] flex flex-col space-y-4 transition-all duration-300 opacity-100"
      >
        <AnimatePresence>
          <>
            {/* WhatsApp Button */}
            <motion.a
              href="https://wa.me/919846981231"
              className={`${buttonStyles} bg-[#25D366] group`}
              aria-label="Contact us on WhatsApp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <FaWhatsapp className={iconStyles} />
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
              <FaPhone className={iconStyles} />
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
              <FaEnvelope className={iconStyles} />
            </motion.button>
          </>
        </AnimatePresence>
      </div>

      {/* Enquiry Form Modal */}
      <AnimatePresence>
        {isEnquiryOpen && (
          <motion.div
            className="fixed inset-0 z-[1500] flex items-center justify-center p-4 bg-black bg-opacity-50"
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    placeholder="Your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                    placeholder="Your phone number"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
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
