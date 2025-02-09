import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Logo } from './Logo';
import { useEffect, useState } from 'react';
import { footerApi } from '../lib/api/footer';
import { FooterSection } from '../lib/types/footer';

export function Footer() {
  const [footers, setFooters] = useState<FooterData[]>([]);

  interface FooterData {
    id: string;
    companyDescription: string;
    logoUrl: string;
    copyrightText: string;
    buttonText: string;
    logo: File | null;
    status: 'new' | 'existing';
  }

  // Static fallback data
  const staticFooter = {
    companyDescription: "Arabian Creativity Consultant provides innovative solutions and expert guidance for businesses across various sectors.",
    logoUrl: "https://example.com/logo.png",
    copyrightText: `© ${new Date().getFullYear()} Arabian Creativity Consultant. All rights reserved.`,
    buttonText: "Contact Us",
  };

  useEffect(() => {
    const fetchFooters = async () => {
      try {
        const response = await footerApi.getById('');
        const footerSection: FooterSection = response.footerSection;

        if (response.isSuccess && response.footerSection) {
          setFooters([
            {
              id: footerSection.id,
              companyDescription: footerSection.companyDescription,
              logoUrl: footerSection.logoUrl,
              copyrightText: footerSection.copyrightText,
              buttonText: footerSection.buttonText,
              logo: null,
              status: 'existing',
            },
          ]);
        } else {
          console.error('Failed to fetch footers:', response.errors);
        }
      } catch (error) {
        console.error('Error fetching footers:', error);
      }
    };

    fetchFooters();
  }, []);

  // Use the API data if available, otherwise fallback to static data
  const footerData = footers.length > 0 ? footers[0] : staticFooter;

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Logo className="w-48 h-auto" />
            <p className="text-gray-400">{footerData.companyDescription}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-4">
              <a href="tel:+966123456789" className="flex items-center group">
                <Phone className="w-5 h-5 mr-3 text-teal-500 group-hover:text-teal-400" />
                <span className="text-gray-400 group-hover:text-teal-400 transition-colors">+966 123 456 789</span>
              </a>
              <a href="mailto:info@acc.com" className="flex items-center group">
                <Mail className="w-5 h-5 mr-3 text-teal-500 group-hover:text-teal-400" />
                <span className="text-gray-400 group-hover:text-teal-400 transition-colors">info@acc.com</span>
              </a>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-teal-500" />
                <span className="text-gray-400">Riyadh, Saudi Arabia</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Services', 'Projects', 'Blog', 'Contact'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-gray-800 p-3 rounded-lg hover:bg-teal-500 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-6">
          <p className="text-center text-gray-400">
            {footerData.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
