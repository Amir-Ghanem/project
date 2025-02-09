import { motion } from 'framer-motion';
import { Building2, PenTool, LayoutPanelTop, Workflow, LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { serviceApi } from '../lib/api/service';
import { useNavigate } from 'react-router-dom';

interface SlideData {
  id: string;
  image: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const services = [
  {
    id: "",
    icon: Building2,
    title: "Construction",
    description: "Expert construction management and oversight for projects of all sizes.",
    image: "https://images.unsplash.com/photo-1541976590-713941681591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "",
    icon: PenTool,
    title: "Structure Design",
    description: "Innovative structural design solutions for modern architecture.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "",
    icon: LayoutPanelTop,
    title: "Architecture",
    description: "Creative architectural designs that blend form and function.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "",
    icon: Workflow,
    title: "Infrastructure",
    description: "Comprehensive infrastructure planning and development.",
    image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

export const ServicesGrid = ({ type = "Home" }) => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const maxSlides = type === "Home" ? 4 : 1000;
  const navigate = useNavigate();

  // Load data on mount
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await serviceApi.getAll();
        if (response.isSuccess && response.services?.items) {
          const fetchedSlides = response.services.items.map((item) => ({
            id: item.id,
            title: item.title,
            image: item.imageUrl ?? '',
            icon: Workflow,
            description: item.description,
          }));
          // Merge with static data if fewer than 4 items
          setSlides([...fetchedSlides].slice(0, maxSlides));
        } else {
          console.error('Failed to fetch slides:', response.errors, response);
          setSlides(services.slice(0, maxSlides));
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
        setSlides(services.slice(0, maxSlides));
      }
    };
    fetchSlides();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={`http://35.180.224.195:2711/${slide.image ?? ''}`}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg shadow-lg"
                >
                  <slide.icon className="w-6 h-6 text-teal-500" />
                </motion.div>
              </div>
              <div className="p-6">
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-bold mb-2 group-hover:text-teal-500 transition-colors"
                >
                  {slide.title}
                </motion.h3>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 mb-4"
                >
                  {slide.description}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-teal-500 font-semibold inline-flex items-center group-hover:text-teal-600 transition-colors"
                  onClick={() => navigate(`/services/${slide.id}`)}
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};