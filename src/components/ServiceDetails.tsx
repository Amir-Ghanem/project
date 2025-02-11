import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, PenTool, LayoutPanelTop, Workflow, LucideIcon } from 'lucide-react';

interface ServiceDetails {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  imageUrl: string;
  isActive: boolean;
}

interface ApiResponse {
  service: ServiceDetails;
  isSuccess: boolean;
  errorCode: number;
  errors: string[];
}

// Map service titles to Lucide icons
const serviceIconMap: { [key: string]: LucideIcon } = {
  Construction: Building2,
  'Structure Design': PenTool,
  Architecture: LayoutPanelTop,
  Infrastructure: Workflow,
};

export const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the service ID from the URL
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch service details on mount
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          `http://35.180.224.195:2712/api/Services/Get?Id=${id}`,
          {
            method: 'GET',
            headers: {
              accept: 'text/plain',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        if (data.isSuccess && data.service) {
          setService(data.service);
        } else {
          setError('Failed to fetch service details.');
        }
      } catch (err) {
        console.error('Error fetching service details:', err);
        setError('An error occurred while fetching service details.');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!service) {
    return <div className="text-center py-20">Service not found.</div>;
  }

  // Get the Lucide icon based on the service title
  const ServiceIcon = serviceIconMap[service.title] || Workflow; // Default to Workflow if no match

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative h-96 overflow-hidden rounded-lg shadow-lg">
            <motion.img
              src={`http://35.180.224.195:2712${service.imageUrl}`}
              alt={service.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-6 left-6 text-white"
            >
              <h1 className="text-4xl font-bold">{service.title}</h1>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 space-y-6"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-teal-500 p-3 rounded-lg shadow-lg">
                <ServiceIcon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold">Service Overview</h2>
            </div>
            <p className="text-gray-600">{service.description}</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/services')}
            className="mt-8 text-teal-500 font-semibold inline-flex items-center hover:text-teal-600 transition-colors"
          >
            Back to Services
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