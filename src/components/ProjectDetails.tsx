import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { projectApi } from '../lib/api/project';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

interface ProjectData {
  id: string;
  title: string;
  projectImagesURLs: string[];
  category: string;
  description: string;
}

export const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if(!id) return;
        const response = await projectApi.getById(id);
        if (response.isSuccess) {
          setProject({
            id: response.project!.id,
            title: response.project!.title,
            projectImagesURLs: response.project!.projectImages || [],
            category: response.project!.category,
            description: response.project!.description || 'No description available.',
          });
        }
      } catch (error) {
        console.error('Failed to fetch project details:', error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Image Slider */}
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Navigation, Pagination, Autoplay]}
          className="rounded-2xl shadow-xl overflow-hidden"
        >
          {project.projectImagesURLs.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={`http://35.180.224.195:2712/${image}`}
                alt={`Project ${index + 1}`}
                className="w-full h-96 object-contain rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Project Title */}
        <div className="mt-8 text-center">
          <h1 className="text-4xl font-bold text-teal-600 relative inline-block">
            <span className="before:absolute before:content-[''] before:block before:w-16 before:h-1 before:bg-teal-600 before:-top-4 before:left-1/2 before:-translate-x-1/2 after:absolute after:content-[''] after:block after:w-16 after:h-1 after:bg-teal-600 after:-bottom-4 after:left-1/2 after:-translate-x-1/2">
              {project.title}
            </span>
          </h1>
          <p className="text-gray-600 mt-6 text-lg">{project.description}</p>
        </div>

        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/projects')}
            className="mt-8 mb-8 ms-8 me-8 text-teal-500 font-semibold inline-flex items-center hover:text-teal-600 transition-colors"
          >
            Back to Projects
            <svg
              className="w-4 h-4 ml-2 transform transition-transform hover:translate-x-1"
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
    </section>
  );
};
