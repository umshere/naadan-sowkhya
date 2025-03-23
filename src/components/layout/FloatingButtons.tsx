'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingButtons = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show floating buttons after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleEnquiry = () => {
    setIsEnquiryOpen(!isEnquiryOpen);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
        <AnimatePresence>
          {isVisible && (
            <>
              {/* WhatsApp Button */}
              <motion.a
                href="https://wa.me/919846981231"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-color text-white shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
                aria-label="Contact us on WhatsApp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="#25D366"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.4944 23.3453H15.4907C13.9979 23.3448 12.5311 22.9702 11.2283 22.2596L6.5 23.5L7.76538 18.878C6.98483 17.5253 6.57411 15.9909 6.57478 14.4189C6.57674 9.50103 10.578 5.49997 15.4943 5.49997C17.8804 5.501 20.1199 6.42989 21.8039 8.11585C23.4879 9.80173 24.4148 12.0427 24.4138 14.4259C24.4119 19.3426 20.4122 23.3433 15.4944 23.3453ZM11.4474 20.6449L11.7181 20.8055C12.8564 21.481 14.1611 21.8384 15.4914 21.8389H15.4944C19.5805 21.8389 22.9062 18.5132 22.9078 14.4254C22.9086 12.4445 22.1382 10.5819 20.7385 9.18056C19.3389 7.77925 17.4775 7.00716 15.4973 7.00647C11.4081 7.00647 8.08236 10.3319 8.08073 14.4194C8.08016 15.8202 8.4721 17.1844 9.21421 18.3647L9.39048 18.6452L8.64155 21.3809L11.4474 20.6449ZM19.988 16.547C19.9323 16.454 19.7837 16.3982 19.5609 16.2866C19.338 16.1751 18.2423 15.636 18.038 15.5615C17.8337 15.4872 17.6851 15.45 17.5365 15.6731C17.388 15.8962 16.9609 16.3982 16.8308 16.547C16.7008 16.6956 16.5708 16.7143 16.348 16.6027C16.1252 16.4912 15.4071 16.2559 14.5558 15.4965C13.8932 14.9056 13.4459 14.1758 13.3159 13.9527C13.1859 13.7295 13.3021 13.609 13.4137 13.4978C13.5139 13.3979 13.6365 13.2375 13.748 13.1074C13.8594 12.9773 13.8965 12.8842 13.9708 12.7356C14.0451 12.5868 14.008 12.4567 13.9522 12.3451C13.8965 12.2336 13.4508 11.1366 13.2651 10.6903C13.0842 10.2557 12.9005 10.3146 12.7637 10.3077C12.6338 10.3012 12.4851 10.2998 12.3365 10.2998C12.188 10.2998 11.9465 10.3556 11.7422 10.5787C11.5379 10.8019 10.9622 11.3411 10.9622 12.438C10.9622 13.535 11.7608 14.5947 11.8722 14.7435C11.9836 14.8923 13.4437 17.1433 15.6794 18.1087C16.2112 18.3383 16.6263 18.4754 16.95 18.5781C17.4838 18.7478 17.9697 18.7239 18.3537 18.6665C18.7819 18.6025 19.6723 18.1274 19.858 17.6068C20.0437 17.0861 20.0437 16.6399 19.988 16.547Z" fill="#FDFDFD"/>
                </svg>
              </motion.a>

              {/* Call Button */}
              <motion.a
                href="tel:9846981231"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-color text-white shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
                aria-label="Call us"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <svg width="20" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.6166 18.8445C16.3859 20.9513 10.6732 18.9717 5.85685 14.423C1.04055 9.87423 -1.05549 4.47888 1.17521 2.37209L2.64396 0.984943C3.65792 0.0273145 5.32868 0.0526282 6.3757 1.04148L8.65066 3.19006C9.69769 4.17891 9.72449 5.75685 8.71053 6.71448L8.39506 7.01242C7.84761 7.52946 7.79405 8.36354 8.30273 8.94573C8.79339 9.50729 9.32236 10.0666 9.8959 10.6083C10.4694 11.15 11.0617 11.6496 11.6563 12.113C12.2727 12.5934 13.1559 12.5428 13.7033 12.0258L14.0188 11.7278C15.0327 10.7702 16.7035 10.7955 17.7505 11.7844L20.0255 13.9329C21.0725 14.9218 21.0993 16.4997 20.0853 17.4574L18.6166 18.8445Z" fill="currentColor"/>
                </svg>
              </motion.a>

              {/* Enquiry Button */}
              <motion.button
                onClick={toggleEnquiry}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-color text-white shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
                aria-label="Send an enquiry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 13.8896 2.52505 15.6594 3.43756 17.1683L2.54581 20.2002C2.32023 20.9672 3.03284 21.6798 3.79975 21.4542L6.83171 20.5624C8.34058 21.475 10.1104 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM9.73821 14.2627C11.7607 16.2852 13.692 16.5518 14.3739 16.5769C15.4111 16.6151 16.421 15.823 16.8147 14.9042C16.9112 14.6792 16.8871 14.4085 16.7255 14.2014C16.1782 13.5005 15.4373 12.9983 14.7134 12.4984C14.4006 12.282 13.9705 12.349 13.7401 12.6555L13.1394 13.5706C13.0727 13.6721 12.9402 13.707 12.8348 13.6467C12.4283 13.4143 11.8356 13.018 11.4092 12.5916C10.9833 12.1657 10.6111 11.5998 10.4022 11.2195C10.3473 11.1195 10.3777 10.996 10.4692 10.928L11.3927 10.2422C11.6681 10.0038 11.7165 9.59887 11.5138 9.30228C11.065 8.64569 10.5422 7.8112 9.7855 7.25926C9.57883 7.1085 9.3174 7.09158 9.10155 7.18408C8.1817 7.5783 7.38574 8.58789 7.42398 9.62695C7.44908 10.3089 7.71572 12.2402 9.73821 14.2627Z" fill="currentColor"/>
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
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