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
    <div className="bg-gradient-to-r from-[#e8f4ea] to-[#f4f7ed] border-b border-[#2c7a43]/10">
      <div className="container mx-auto py-2 px-4 max-w-7xl">
        <div className="flex flex-row justify-between items-center text-sm">
          {/* Contact Info - Only Phone visible on mobile */}
          <div className="flex items-center space-x-4">
            <a 
              href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
              className="flex items-center text-[#2c7a43] hover:text-[#1a4d2e] transition-colors"
            >
              <FaPhoneAlt className="mr-1.5" />
              <span className="font-medium">{contactData.phone}</span>
            </a>
            
            {/* Email - Hidden on mobile */}
            <div className="hidden md:flex items-center text-[#2c7a43]/80 hover:text-[#2c7a43] transition-colors">
              <FaEnvelope className="mr-1.5" />
              <a href={`mailto:${contactData.email}`} className="hover:underline">
                {contactData.email}
              </a>
            </div>
            
            {/* Working Hours - Hidden on mobile */}
            <div className="hidden lg:flex items-center text-[#2c7a43]/80">
              <FaClock className="mr-1.5" />
              <span>{contactData.workingHours}</span>
            </div>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center">
            <div className="flex space-x-3">
              {[
                { Icon: FaFacebookF, link: contactData.socialMedia.facebook, label: "Facebook", color: "#1877F2", hoverBg: "#1877F2" },
                { Icon: FaInstagram, link: contactData.socialMedia.instagram, label: "Instagram", color: "#E1306C", hoverBg: "#E1306C" },
                { Icon: FaTwitter, link: contactData.socialMedia.twitter, label: "Twitter", color: "#1DA1F2", hoverBg: "#1DA1F2" },
                { Icon: FaWhatsapp, link: contactData.socialMedia.whatsapp, label: "WhatsApp", color: "#25D366", hoverBg: "#25D366" },
                { Icon: FaTelegram, link: contactData.socialMedia.telegram, label: "Telegram", color: "#0088cc", hoverBg: "#0088cc" }
              ].map(({ Icon, link, label, color, hoverBg }) => (
                <a 
                  key={label}
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={label}
                  className="w-7 h-7 flex items-center justify-center rounded-full transition-all transform hover:scale-110 group"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon 
                    className="w-3.5 h-3.5 transition-colors" 
                    style={{ color }}
                  />
                  <style jsx>{`
                    a:hover {
                      background-color: ${hoverBg};
                    }
                    a:hover svg {
                      color: white !important;
                    }
                  `}</style>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
