import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { contactApi } from '../lib/api/contact';
import { ContactSection } from '../lib/types/contact';
import { HeroSection } from '../components/about/HeroSection';

export default function Contact() {
  const [contactSection, setContactSection] = useState<ContactSection | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContactSection = async () => {
      try {
        const response = await contactApi.getContactSection("Contacts");
        if (response.contactSection) {
          setContactSection(response.contactSection);
        }
      } catch (error) {
        console.error('Failed to fetch contact section:', error);
      }
    };

    fetchContactSection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      await contactApi.submitRequest(data);
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        service: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20">

      <HeroSection
      type='Contacts'
      />
      {/* Hero Section */}
      {/* <section className="relative h-[40vh] bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {contactSection?.title || 'Contact Us'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-100"
            >
              {contactSection?.subtitle || 'Get in touch with our team'}
            </motion.p>
          </div>
        </div>
      </section> */}

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-teal-500/10 rounded-full">
                  <Phone className="w-6 h-6 text-teal-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">{contactSection?.phoneLabel || '+966 123 456 789'}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-teal-500/10 rounded-full">
                  <Mail className="w-6 h-6 text-teal-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-600">{contactSection?.emailLabel || 'info@acc.com'}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-teal-500/10 rounded-full">
                  <MapPin className="w-6 h-6 text-teal-500" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-600">{contactSection?.addressLabel || 'Riyadh, Saudi Arabia'}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-xl shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select a service</option>
                  <option value="Construction">Construction</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Consultation">Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      {contactSection?.showMap && (
        <section className="h-[400px] bg-gray-100">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.674754711687!2d${contactSection.longitude}!3d${contactSection.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQwJzI0LjAiTiA0NsKwNDEnMzYuMCJF!5e0!3m2!1sen!2ssa!4v1625136993425!5m2!1sen!2ssa`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </section>
      )}
    </main>
  );
}