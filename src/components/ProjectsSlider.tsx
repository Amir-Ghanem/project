import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { projectApi } from '../lib/api/project';

interface SlideData {
  id: string;
  title: string;
  projectImagesURLs: string[];
  category: string;
}

const staticProjects = [
  {
    id: '1',
    title: 'Modern Office Complex',
    projectImagesURLs: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    category: 'Commercial',
  },
  {
    id: '2',
    title: 'Residential Tower',
    projectImagesURLs: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    category: 'Residential',
  },
  {
    id: '3',
    title: 'Smart City Planning',
    projectImagesURLs: ['https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    category: 'Urban Development',
  },
];

export const ProjectsSlider = ({type = "Home"}) => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const maxSlides = type === "Home" ?6:1000;
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await projectApi.getAll();
        const fetchedSlides = response.isSuccess && response.projects?.items
          ? response.projects.items.map((item ) => ({
              id: item.id,
              title: item.title,
              projectImagesURLs: item.projectImages || [],
              category: item.category,
            }))
          : [];

        const combinedSlides = [...fetchedSlides, ...staticProjects].slice(0, maxSlides);
        setSlides(combinedSlides);
      } catch (error) {
        console.error('Failed to fetch slides:', error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Projects
        </motion.h2>
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{ delay: 3000 }}
          className="projects-slider"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="w-[300px] sm:w-[400px]">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="relative group"
              >
                <img
                  // src={slide.projectImagesURLs[0]}
                 src={`http://35.180.224.195:2712/${slide.projectImagesURLs[0] ?? ''}`} 
                  alt={slide.title}
                  className="w-full h-[300px] object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                    <p>{slide.category}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
