import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { blogsApi } from '../lib/api/blog';

interface BlogData {
  id: string;
  title: string;
  content: string;
  date: string;
  isPublished: boolean;
  summary: string;
  author: string;
  
  imageUrl: string;
  htmlContent: string | null;
  status: 'new' | 'existing';
}

const blogsLocal = [
  {
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Future of Sustainable Architecture",
    summary: "Exploring innovative approaches to eco-friendly building design.",
    date: "Mar 15, 2024"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Smart Cities Development",
    summary: "How technology is shaping the future of urban planning.",
    date: "Mar 10, 2024"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "Modern Office Design Trends",
    summary: "Creating productive workspaces for the future.",
    date: "Mar 5, 2024"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1518884567783-e7f30a0f44b1?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGxhcmdlJTIwbWVldGluZ3xlbnwwfHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    title: "The Future of Work",
    summary: "Adapting to remote work culture and the next steps in workplace evolution.",
    date: "Feb 28, 2024"
  }
];

export const  BlogsSection = ({type = "Home"}) => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const maxSlides = type === "Home" ?4:1000;
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await blogsApi.getAll();
      if (response.isSuccess && response.newsList?.items) {
        setBlogs(
          response.newsList.items.map(item => ({
            id: item.id,
            title: item.title,
            content: item.content,
            date: item.publishDate,
            isPublished: item.isPublished,
            summary: item.summary,
            author: item.author,
            imageUrl: item.images[0] ?? '',
            image: null,
            htmlContent: '<h1>Test</h1>',
            status: 'existing',
          }))
        );
      } else {
        console.error('Failed to fetch blogs:', response.errors);
      }
    };
    fetchBlogs();
  }, []);

  // Use the API data if available, otherwise fallback to static data
  const displayedBlogs = blogs.length > 0 ? blogs.slice(0, maxSlides) : blogsLocal.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Latest Insights
        </motion.h2>
        <Swiper
          modules={[Autoplay, Navigation]}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          spaceBetween={30}
          autoplay={{ delay: 3000 }}
          className="blogs-slider"
        >
          {displayedBlogs.map((blog, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                   src={`http://35.180.224.195:2712/${blog.imageUrl ?? ''}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{blog.date || blog.date}</p>
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">{blog.summary || blog.summary}</p>
                  <a href="#" className="inline-flex items-center text-teal-500 hover:text-teal-600">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
