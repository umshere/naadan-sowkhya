'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaInstagram, 
  FaFacebookF, 
  FaWhatsapp, 
  FaTelegram, 
  FaTwitter, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaClock,
  FaMapMarkerAlt 
} from 'react-icons/fa';
import contactData from "@/data/contact.json";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--natural-light)] to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-10 px-4 mb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            {/* Contact Information */}
            <div className="bg-[var(--primary-color)] text-white p-8 md:p-12 md:w-2/5">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="mb-8">We're here to help and answer any questions you might have. We look forward to hearing from you.</p>
              
              {/* Fixed icon and text alignment */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                    <FaMapMarkerAlt className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="mt-1 text-white/90">{contactData.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                    <FaPhoneAlt className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="mt-1 text-white/90">{contactData.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                    <FaClock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Working Hours</h3>
                    <p className="mt-1 text-white/90">{contactData.workingHours}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                    <FaEnvelope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="mt-1 text-white/90">{contactData.email}</p>
                  </div>
                </div>
              </div>
              
              {/* Social media icons with brand colors */}
              <div className="mt-12">
                <h3 className="font-semibold text-lg mb-4">Connect with us</h3>
                <div className="flex space-x-4">
                  <a 
                    href={contactData.socialMedia.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white transition-transform duration-300 hover:shadow-lg hover:scale-110"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="w-6 h-6 text-[#1877F2]" />
                  </a>
                  <a 
                    href={contactData.socialMedia.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white transition-transform duration-300 hover:shadow-lg hover:scale-110"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-6 h-6 text-[#E1306C]" />
                  </a>
                  <a 
                    href={contactData.socialMedia.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white transition-transform duration-300 hover:shadow-lg hover:scale-110"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="w-6 h-6 text-[#1DA1F2]" />
                  </a>
                  <a 
                    href={contactData.socialMedia.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white transition-transform duration-300 hover:shadow-lg hover:scale-110"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                  </a>
                  <a 
                    href={contactData.socialMedia.telegram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white transition-transform duration-300 hover:shadow-lg hover:scale-110"
                    aria-label="Telegram"
                  >
                    <FaTelegram className="w-6 h-6 text-[#0088cc]" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="p-8 md:p-12 md:w-3/5">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-300"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Information">Product Information</option>
                      <option value="Support">Support</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-300"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 ${
                      isSubmitting ? 'bg-gray-400' : 'bg-[var(--primary-color)]'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-lg bg-green-50 text-green-800 text-center animate-fadeIn">
                    Thank you! Your message has been sent successfully. We'll get back to you shortly.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-lg bg-red-50 text-red-800 text-center animate-fadeIn">
                    Oops! Something went wrong. Please try again later or contact us directly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 px-4 mb-20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--primary-color)] mb-10">
            Find Us
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-semibold text-gray-800">
                Sowkhya 100% Natural & Herbal Products
              </h3>
            </div>
            <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15683.573383045079!2d76.0028145!3d10.665386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba795eba226e445%3A0x5634d2cdac72799a!2sSowkhya%20100%25%20Natural%20%26%20Herbal%20Products!5e0!3m2!1sen!2ssa!4v1710173945018!5m2!1sen!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sowkhya Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <a 
              href="https://www.google.com/maps/place/Sowkhya%20100%25%20Natural%20%26%20Herbal%20Products/@10.665386,76.0028145,17z/data=!3m1!4b1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--primary-color)] hover:underline inline-flex items-center"
            >
              <FaMapMarkerAlt className="mr-2" />
              View larger map
            </a>
            <a 
              href="https://www.google.com/maps/dir//Sowkhya%20100%25%20Natural%20%26%20Herbal%20Products" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[var(--primary-color)] hover:underline inline-flex items-center"
            >
              <FaMapMarkerAlt className="mr-2" />
              Get directions
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
