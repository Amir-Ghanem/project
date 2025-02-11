import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { projectApi } from '../lib/api/project';
import { useNavigate } from 'react-router-dom';

interface ProjectData {
  id: string;
  title: string;
  projectImagesURLs: string[];
  category: string;
  description: string;
}

const staticProjects = [
  {
    id: '1',
    title: 'Modern Office Complex',
    projectImagesURLs: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    category: 'Commercial',
    description: 'A state-of-the-art office complex designed for modern businesses.',
  },
  {
    id: '2',
    title: 'Residential Tower',
    projectImagesURLs: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    category: 'Residential',
    description: 'A luxurious residential tower offering unparalleled comfort and style.',
  },
  {
    id: '3',
    title: 'Smart City Planning',
    projectImagesURLs: ['https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    category: 'Urban Development',
    description: 'Innovative smart city planning for sustainable urban living.',
  },
];

export const ProjectsGrid = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.getAll();
        const fetchedProjects = response.isSuccess && response.projects?.items
          ? response.projects.items.map((item) => ({
              id: item.id,
              title: item.title,
              projectImagesURLs: item.projectImages || [],
              category: item.category,
              description: item.description || 'No description available.',
            }))
          : [];

        const combinedProjects = [...fetchedProjects, ...staticProjects];
        setProjects(combinedProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  if (projects.length === 0) {
    return <div>Loading...</div>;
  }

  const firstProject = projects[0];
  const otherProjects = projects.slice(1);

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

        {/* First Project */}
   
        <div className="flex flex-col md:flex-row items-center mb-12">
  {/* First Project Image */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="w-full md:w-1/2 mb-8 md:mb-0 p-2 border-4 border-primary rounded-lg" // Added border styling
            >
                <img
                        src={`http://35.180.224.195:2712/${firstProject.projectImagesURLs[0]}`}
                        alt={firstProject.title}
                className="w-full h-auto rounded-lg" // Ensure the image itself is rounded
                onClick={() => navigate(`/projects/${firstProject.id}`)}
                />
            </motion.div>

            {/* First Project Description */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="w-full md:w-1/2 md:pl-8"
            >
                <h3 className="text-2xl font-bold mb-4">{firstProject.title}</h3>
                <p className="text-gray-600 mb-4">{firstProject.description}</p>
                <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full">
                {firstProject.category}
                </span>
            </motion.div>
        </div>

        {/* Grid of Other Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative group"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <img
                src={project.projectImagesURLs[0]}
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p>{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};