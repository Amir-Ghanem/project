import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { heroApi } from '../../lib/api/hero';

const localSlides = [
  {
    id : '',
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    title: "About Us",
    subtitle: "Building Tomorrow's Vision Today: Leading the way in construction and architectural excellence",
    primaryButtonText: null,
    secondaryButtonText: null,
    primaryButtonUrl: null,
    secondaryButtonUrl: null,
    isActive: true,
    pageIdentifier: "About",
    status: 'new',
    backgroundImage: null
  }
];

interface SlideData {
  id: string;
  image: string | null; // Allow null here
  title: string;
  subtitle: string;
  backgroundImage: File | null;
  primaryButtonText: string | null;
  secondaryButtonText: string | null;
  primaryButtonUrl: string | null;
  secondaryButtonUrl: string | null;
  isActive: boolean;
  pageIdentifier: string;
  status: 'new' | 'existing';
}

export const HeroSection = ({type = "Home"}) => {
  const [slides, setSlides] = useState<SlideData[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await heroApi.getAll();
        if (response.isSuccess && response.heroSections?.items) {
          const filteredSlides = response.heroSections.items
            .filter((item) => item.pageIdentifier === type)
            .map((item) => ({
              id: item.id,
              title: item.title,
              subtitle:item.subtitle, // Combine subtitle and description
              image: item.backgroundImage,
              primaryButtonText: item.primaryButtonText,
              primaryButtonUrl: item.primaryButtonUrl,
              secondaryButtonText: item.secondaryButtonText,
              secondaryButtonUrl: item.secondaryButtonUrl,
              isActive: item.isActive,
              pageIdentifier: item.pageIdentifier,
              status: 'existing',
              backgroundImage: null
            }));
            setSlides(
              filteredSlides.map(item => ({
                id: item.id,
                title: item.title,
                subtitle: item.subtitle,
                image: item.image,
                primaryButtonText: item.primaryButtonText,
                primaryButtonUrl: item.primaryButtonUrl,
                secondaryButtonText: item.secondaryButtonText,
                secondaryButtonUrl: item.secondaryButtonUrl,
                isActive: item.isActive,
                pageIdentifier: item.pageIdentifier,
                status: 'existing', // Ensure this matches the union type
                backgroundImage: null,
              }))
            );
            
        } else {
          console.error('Failed to fetch slides:', response.errors);
          setSlides(localSlides.map(item => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle,
            image: item.image,
            primaryButtonText: item.primaryButtonText,
            primaryButtonUrl: item.primaryButtonUrl,
            secondaryButtonText: item.secondaryButtonText,
            secondaryButtonUrl: item.secondaryButtonUrl,
            isActive: item.isActive,
            pageIdentifier: item.pageIdentifier,
            status: 'existing', // Ensure this matches the union type
            backgroundImage: null,
          }))); // Fallback to local data
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
        setSlides(localSlides.map(item => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          image: item.image,
          primaryButtonText: item.primaryButtonText,
          primaryButtonUrl: item.primaryButtonUrl,
          secondaryButtonText: item.secondaryButtonText,
          secondaryButtonUrl: item.secondaryButtonUrl,
          isActive: item.isActive,
          pageIdentifier: item.pageIdentifier,
          status: 'existing', // Ensure this matches the union type
          backgroundImage: null,
        }))); // Fallback to local data
      }
    };
    fetchSlides();
  }, []);

  return (
    <section className="relative h-screen">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                
                src={slide.image !== ''? `http://35.180.224.195:2712/${slide.image}` : '' }
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-6">
                      {slide.subtitle}
                    </p>
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
