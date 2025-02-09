import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { heroApi } from '../lib/api/hero';

interface SlideData {
  id: string;
  image: string | null;
  title: string;
  subtitle: string;
  backgroundImage: File | null;
  primaryButtonText: string | null;
  secondaryButtonText: string | null;
  primaryButtonUrl: string | null;
  secondaryButtonUrl: string | null;
  isActive: boolean;
  pageIdentifier: string;
  
}

const localSlides = [
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    title: "Arabian Creativity Consultant",
    subtitle: "Innovative and effective office in the field of consulting and specialized studies",
    description: "Leading the way in construction and architectural excellence"
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    title: "Building Tomorrow",
    subtitle: "Creating sustainable solutions for a better future",
    description: "Expert consultation services for modern construction projects"
  },
  {
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    title: "Excellence in Design",
    subtitle: "Where innovation meets functionality",
    description: "Transforming visions into architectural masterpieces"
  }
];

export function HeroSlider() {
  const [apiSlides, setSlides] = useState<SlideData[]>([]);

  // Load data on mount
  useEffect(() => {
    const fetchSlides = async () => {
      const response = await heroApi.getAll();
      if (response.isSuccess && response.heroSections?.items) {
        const filteredSlides = response.heroSections.items
          .filter((item) => item.pageIdentifier === 'Home') // Filter slides where pageIdentifier equals 'Home'
          .map((item) => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            image: item.backgroundImage,
            primaryButtonText: item.primaryButtonText,
            primaryButtonUrl: item.primaryButtonUrl,
            secondaryButtonText: item.secondaryButtonText,
            secondaryButtonUrl: item.secondaryButtonUrl,
            isActive: item.isActive,
            pageIdentifier: item.pageIdentifier,
            backgroundImage: null
          }));
        setSlides(filteredSlides);
      } else {
        console.error('Failed to fetch slides:', response.errors);
      }
    };
    fetchSlides();
  }, []);

  // Fallback to local slides if no API slides are available
  const slidesToDisplay = apiSlides.length > 0 ? apiSlides : localSlides;

  return (
    <section className="relative h-screen">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="h-full"
      >
        {slidesToDisplay.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={`http://35.180.224.195:2711/${slide.image ?? ''}`} // Prepend base URL to the image URL
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-3xl mx-auto text-center"
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="text-xl md:text-2xl text-gray-200 mb-6"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      className="text-lg text-gray-300 mb-8"
                    >
                      {/* {slide.description} */}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                    >
                      <a
                        href="#contact"
                        className="inline-block bg-teal-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-600 transition-colors"
                      >
                        Get Started
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
