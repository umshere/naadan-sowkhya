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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-[var(--primary-light)]">
        {/* Decorative background */}
        <motion.div 
          className="absolute inset-0 bg-[url('/images/backgrounds/subtle-leaf-bg.svg')] bg-repeat opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
        />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block text-sm font-semibold tracking-wider text-[var(--tertiary-color)] uppercase mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Contact Us
            </motion.span>
            <motion.h1 
              className="font-serif text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-lg text-[var(--text-dark)] max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              We'd love to hear from you. Whether you have a question about our products, business 
              opportunities, or anything else, our team is ready to assist you.
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
          <svg viewBox="0 0 1440 120" className="relative w-full h-16" preserveAspectRatio="none">
            <path 
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[var(--primary-light)] p-8 rounded-2xl"
            >
              <h2 className="text-2xl font-serif font-bold text-[var(--primary-color)] mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-5 h-5 text-[var(--primary-color)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--primary-color)]">Visit Us</h3>
                    <p className="mt-1 text-[var(--text-dark)]">{contactData.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt className="w-5 h-5 text-[var(--primary-color)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--primary-color)]">Call Us</h3>
                    <p className="mt-1 text-[var(--text-dark)]">{contactData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="w-5 h-5 text-[var(--primary-color)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--primary-color)]">Email Us</h3>
                    <p className="mt-1 text-[var(--text-dark)]">{contactData.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                    <FaClock className="w-5 h-5 text-[var(--primary-color)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--primary-color)]">Working Hours</h3>
                    <p className="mt-1 text-[var(--text-dark)]">{contactData.workingHours}</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-12">
                <h3 className="font-semibold text-[var(--primary-color)] mb-6">Connect With Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: FaFacebookF, link: contactData.socialMedia.facebook, color: '#1877F2' },
                    { icon: FaInstagram, link: contactData.socialMedia.instagram, color: '#E1306C' },
                    { icon: FaWhatsapp, link: contactData.socialMedia.whatsapp, color: '#25D366' },
                    { icon: FaTelegram, link: contactData.socialMedia.telegram, color: '#0088cc' },
                    { icon: FaTwitter, link: contactData.socialMedia.twitter, color: '#1DA1F2' }
                  ].map(({ icon: Icon, link, color }) => (
                    <motion.a
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm"
                      whileHover={{ scale: 1.1, backgroundColor: color }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5 text-[var(--primary-color)] group-hover:text-white" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-serif font-bold text-[var(--primary-color)] mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-300"
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-300"
                      whileFocus={{ scale: 1.01 }}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <motion.input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-300"
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <motion.select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-300"
                      whileFocus={{ scale: 1.01 }}
                    >
                      <option value="">Select a subject</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Business Opportunity">Business Opportunity</option>
                      <option value="Support">Support</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </motion.select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-colors duration-300"
                    whileFocus={{ scale: 1.01 }}
                    placeholder="How can we help you?"
                  ></motion.textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-medium text-white shadow-sm transition-all duration-300 
                    ${isSubmitting ? 'bg-gray-400' : 'bg-[var(--primary-color)] hover:bg-[var(--secondary-color)]'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                </motion.button>
                
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-green-50 text-green-800 text-center"
                  >
                    Thank you! Your message has been sent successfully. We'll get back to you shortly.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-50 text-red-800 text-center"
                  >
                    Oops! Something went wrong. Please try again later or contact us directly.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 bg-[var(--natural-light)]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold text-[var(--primary-color)] mb-6">
              Visit Our Store
            </h2>
            <p className="text-[var(--text-dark)] max-w-2xl mx-auto">
              Come experience our products in person. We're conveniently located and always happy to welcome you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="h-[500px]">
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
            <div className="p-6 flex justify-center space-x-6">
              <motion.a 
                href="https://www.google.com/maps/place/Sowkhya%20100%25%20Natural%20%26%20Herbal%20Products/@10.665386,76.0028145,17z/data=!3m1!4b1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMapMarkerAlt className="mr-2" />
                View larger map
              </motion.a>
              <motion.a 
                href="https://www.google.com/maps/dir//Sowkhya%20100%25%20Natural%20%26%20Herbal%20Products" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-[var(--primary-color)] hover:text-[var(--secondary-color)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMapMarkerAlt className="mr-2" />
                Get directions
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
