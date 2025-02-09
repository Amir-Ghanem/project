import { motion } from 'framer-motion';
import { Target, Eye, Goal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { missionApi } from '../../lib/api/mission';

const defaultCards = [
  {
    title: "Our Mission",
    description: "To deliver innovative solutions that exceed client expectations.",
    iconUrl: Target
  },
  {
    title: "Our Vision",
    description: "To be the leading force in construction consulting excellence.",
    iconUrl: Eye
  },
  {
    title: "Our Goals",
    description: "To create lasting value through sustainable practices.",
    iconUrl: Goal
  }
];

export function MissionVisionSection() {
  const [cards, setCards] = useState(defaultCards);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await missionApi.getAll();
        if (response.isSuccess && response.missions?.items) {
          const apiMissions = response.missions.items;

          const updatedCards = [
            {
              title: apiMissions.find(item => item.title?.toLowerCase().includes("mission"))?.title || defaultCards[0].title,
              description: apiMissions.find(item => item.title?.toLowerCase().includes("mission"))?.description || defaultCards[0].description,
              iconUrl: defaultCards[0].iconUrl
            },
            {
              title: apiMissions.find(item => item.title?.toLowerCase().includes("vision"))?.title || defaultCards[1].title,
              description: apiMissions.find(item => item.title?.toLowerCase().includes("vision"))?.description || defaultCards[1].description,
              iconUrl: defaultCards[1].iconUrl
            },
            {
              title: apiMissions.find(item => item.title?.toLowerCase().includes("goal"))?.title || defaultCards[2].title,
              description: apiMissions.find(item => item.title?.toLowerCase().includes("goal"))?.description || defaultCards[2].description,
              iconUrl: defaultCards[2].iconUrl
            }
          ];

          setCards(updatedCards);
        } else {
          console.error('Failed to fetch missions:', response.errors);
        }
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };

    fetchMissions();
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-left"
            >
              <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl">
                Guided by our principles, we strive to deliver excellence in everything we do.
              </p>
            </motion.div>

            <div className="grid gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4"
                >
                  <div className="bg-teal-500/10 p-3 rounded-lg">
                    <card.iconUrl className="w-6 h-6 text-teal-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden"
          >
            <video
              className="w-full h-full object-cover rounded-2xl"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-set-of-brackets-drawn-in-the-notebook-9265-large.mp4"
                type="video/mp4"
              />
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
