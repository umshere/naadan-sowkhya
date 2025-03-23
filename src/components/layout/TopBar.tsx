'use client';

import Link from 'next/link';
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaClock, 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp, 
  FaTelegram 
} from 'react-icons/fa';
import contactData from '@/data/contact.json';

export default function TopBar() {
  return (
    <div className="bg-[var(--primary-color)] text-white">
      <div className="container mx-auto py-2 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2 sm:mb-0">
            {/* Enhanced text contrast with white color and proper spacing */}
            <div className="flex items-center text-white">
              <FaEnvelope className="mr-2 text-white" />
              <a href={`mailto:${contactData.email}`} className="hover:underline">
                {contactData.email}
              </a>
            </div>
            <div className="flex items-center text-white">
              <FaPhoneAlt className="mr-2 text-white" />
              <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`} className="hover:underline">
                {contactData.phone}
              </a>
            </div>
            <div className="flex items-center text-white">
              <FaClock className="mr-2 text-white" />
              <span>{contactData.workingHours}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Social Media Icons */}
            <div className="flex space-x-3 mr-6">
              <a 
                href={contactData.socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="text-white hover:text-white/80 transition-colors"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a 
                href={contactData.socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="text-white hover:text-white/80 transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a 
                href={contactData.socialMedia.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter"
                className="text-white hover:text-white/80 transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a 
                href={contactData.socialMedia.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp"
                className="text-white hover:text-white/80 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a 
                href={contactData.socialMedia.telegram} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Telegram"
                className="text-white hover:text-white/80 transition-colors"
              >
                <FaTelegram className="w-4 h-4" />
              </a>
            </div>
            
           
          </div>
        </div>
      </div>
    </div>
  );
}
