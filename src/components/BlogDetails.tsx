import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Assuming you are using React Router
import { blogsApi } from "../lib/api/blog";

interface BlogData {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  imageUrl: string[];
}

export const BlogDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the blog ID from the route params
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await blogsApi.getById(id!); // Call the API to get blog details
        if (response.isSuccess && response.news) {
          setBlog({
            id: response.news.id,
            title: response.news.title,
            content: response.news.content,
            date: response.news.publishDate,
            author: response.news.author,
            imageUrl: response.news.images,
          });
        } else {
          setError("Failed to fetch blog details.");
        }
      } catch (err) {
        setError("An error occurred while fetching the blog details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading blog details...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center py-20">No blog details available.</div>;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Blog Image */}
          <img
            src={`http://35.180.224.195:2711/${blog.imageUrl}`}
            alt={blog.title}
            className="w-full h-96 object-contain"
          />

          {/* Blog Content */}
          <div className="p-8">
            {/* Blog Title */}
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

            {/* Blog Author and Date */}
            <div className="text-gray-500 text-sm mb-6">
              <p>By {blog.author}</p>
              <p>{blog.date}</p>
            </div>

            {/* Blog Content */}
            <div
              className="text-gray-700 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/blog')}
            className="mt-8 mb-8 ms-8 me-8 text-teal-500 font-semibold inline-flex items-center hover:text-teal-600 transition-colors"
          >
            Back to Blogs
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
        </motion.div>
      </div>
    </section>
  );
};
