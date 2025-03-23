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
    <div className="bg-[var(--primary-color)]">
      <div className="container mx-auto py-2 px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-2 sm:mb-0">
            <div className="flex items-center text-white/90 hover:text-white transition-colors">
              <FaEnvelope className="mr-2" />
              <a href={`mailto:${contactData.email}`} className="hover:underline">
                {contactData.email}
              </a>
            </div>
            <div className="flex items-center text-white/90 hover:text-white transition-colors">
              <FaPhoneAlt className="mr-2" />
              <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`} className="hover:underline">
                {contactData.phone}
              </a>
            </div>
            <div className="flex items-center text-white/90">
              <FaClock className="mr-2" />
              <span>{contactData.workingHours}</span>
            </div>
          </div>
          
          {/* Social Media & Quick Links */}
          <div className="flex items-center space-x-6">
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                { Icon: FaFacebookF, link: contactData.socialMedia.facebook, label: "Facebook" },
                { Icon: FaInstagram, link: contactData.socialMedia.instagram, label: "Instagram" },
                { Icon: FaTwitter, link: contactData.socialMedia.twitter, label: "Twitter" },
                { Icon: FaWhatsapp, link: contactData.socialMedia.whatsapp, label: "WhatsApp" },
                { Icon: FaTelegram, link: contactData.socialMedia.telegram, label: "Telegram" }
              ].map(({ Icon, link, label }) => (
                <a 
                  key={label}
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={label}
                  className="text-white/80 hover:text-white transition-colors transform hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
