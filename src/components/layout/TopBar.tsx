'use client';

// Removed useState, useEffect, useRef as they are now handled in Header.tsx
// import Link from 'next/link'; // Removed unused import
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
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

export default function TopBar() {
  // Removed isVisible and lastScrollY state
  // Removed controlTopBar function and useEffect

  const socialLinks = [
    { Icon: FaFacebookF, link: contactData.socialMedia.facebook, label: "Facebook", color: "text-blue-600", hoverColor: "hover:bg-blue-600 hover:text-white" },
    { Icon: FaInstagram, link: contactData.socialMedia.instagram, label: "Instagram", color: "text-pink-600", hoverColor: "hover:bg-pink-600 hover:text-white" },
    { Icon: FaTwitter, link: contactData.socialMedia.twitter, label: "Twitter", color: "text-sky-500", hoverColor: "hover:bg-sky-500 hover:text-white" },
    { Icon: FaWhatsapp, link: contactData.socialMedia.whatsapp, label: "WhatsApp", color: "text-green-500", hoverColor: "hover:bg-green-500 hover:text-white" },
    { Icon: FaTelegram, link: contactData.socialMedia.telegram, label: "Telegram", color: "text-blue-500", hoverColor: "hover:bg-blue-500 hover:text-white" }
  ];

  return (
    // Removed sticky, top-0, z-index, transition, and conditional translate classes
    // Made background opaque
    <div className="bg-muted border-b border-border/50">
      <div className="container mx-auto py-1.5 md:py-2 px-4 max-w-7xl">
        <div className="flex flex-row justify-between items-center text-sm">
          {/* Contact Info */}
          <div className="flex items-center space-x-2 md:space-x-4 text-muted-foreground">
            <a
              href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
              className="flex items-center text-foreground hover:text-primary transition-colors text-xs md:text-sm"
            >
              <FaPhoneAlt className="mr-1 w-3 h-3 md:w-4 md:h-4" />
              <span className="font-medium">{contactData.phone}</span>
            </a>
            <div className="hidden md:flex items-center hover:text-foreground transition-colors">
              <FaEnvelope className="mr-1.5" />
              <a href={`mailto:${contactData.email}`} className="hover:underline">
                {contactData.email}
              </a>
            </div>
            <div className="hidden lg:flex items-center">
              <FaClock className="mr-1.5" />
              <span>{contactData.workingHours}</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center">
            <TooltipProvider delayDuration={100}>
              <div className="flex space-x-1 md:space-x-1.5">
                {socialLinks.map(({ Icon, link, label, color, hoverColor }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn("w-6 h-6 md:w-7 md:h-7 rounded-full transition-colors duration-200", hoverColor)}
                        asChild
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                        >
                          <Icon className={cn("w-3 h-3 md:w-3.5 md:h-3.5", color)} />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
