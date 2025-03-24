'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaEnvelope, FaTimes, FaComments } from 'react-icons/fa';

const FloatingButtons = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleEnquiry = () => {
    setIsEnquiryOpen(!isEnquiryOpen);
    setIsMenuOpen(false); // Close menu when opening enquiry form
  };

  // Common styles
  const buttonStyles = "flex items-center justify-center rounded-full shadow-md transition-all duration-200";
  const iconStyles = "text-white";

  return (
    <>
      {/* Main floating contact button container */}
      <div className="fixed bottom-6 right-4 z-[1000] flex flex-col items-end space-y-3">
        {/* Contact options that appear when main button is clicked */}
        <AnimatePresence>
          {isMenuOpen && (
            <div className="flex flex-col space-y-3">
              {/* WhatsApp Button */}
              <motion.a
                href="https://wa.me/919846981231"
                className={`${buttonStyles} bg-[#25D366] w-12 h-12`}
                aria-label="Contact us on WhatsApp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <FaWhatsapp className={`${iconStyles} w-6 h-6`} />
              </motion.a>

              {/* Call Button */}
              <motion.a
                href="tel:9846981231"
                className={`${buttonStyles} bg-[#4CAF50] w-12 h-12`}
                aria-label="Call us"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.05 }}
              >
                <FaPhone className={`${iconStyles} w-6 h-6`} />
              </motion.a>

              {/* Enquiry Button */}
              <motion.button
                onClick={toggleEnquiry}
                className={`${buttonStyles} bg-[#2196F3] w-12 h-12`}
                aria-label="Send an enquiry"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.1 }}
              >
                <FaEnvelope className={`${iconStyles} w-6 h-6`} />
              </motion.button>
            </div>
          )}
        </AnimatePresence>

        {/* Main contact button */}
        <motion.button
          onClick={toggleMenu}
          className={`${buttonStyles} bg-primary-color w-14 h-14`}
          aria-label={isMenuOpen ? "Close contact options" : "Open contact options"}
          whileHover={{ scale: 1.05 }}
        >
          <FaComments className={`${iconStyles} w-7 h-7`} />
        </motion.button>
      </div>

      {/* Enquiry Form Modal */}
      <AnimatePresence>
        {isEnquiryOpen && (
          <div
            className="fixed inset-0 z-[1500] flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={() => setIsEnquiryOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsEnquiryOpen(false)}
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

                <button
                  type="submit"
                  className="w-full bg-primary-color text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingButtons;
