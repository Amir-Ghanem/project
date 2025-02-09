import { motion } from 'framer-motion';
import { Users, Building2, Award, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { statisticsApi } from '../lib/api/statistics';

const localStats = [
  { icon: Users, value: "250+", label: "Satisfied Clients", suffix: "+" },
  { icon: Building2, value: "15", label: "Major Projects", suffix: "+" },
  { icon: Award, value: "8", label: "Industry Awards", suffix: "" },
  { icon: Clock, value: "8", label: "Years Experience", suffix: "+" }
];

interface StatisticData {
  id?: string;
  title: string;
  value: string;
  status: 'new' | 'existing';
  icon?: any; // Icon component type
  suffix?: string;
}

export function StatisticsSection() {
  const [statistics, setStatistics] = useState<StatisticData[]>([]);

  // Load data on mount
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await statisticsApi.getAll();
        if (response.isSuccess && response.statistics?.items) {
          setStatistics(
            response.statistics.items.map((item: any) => ({
              id: item.id,
              title: item.title,
              value: item.value,
              status: 'existing',
              suffix: '+' // You can customize suffix if the API provides one
            }))
          );
        } else {
          console.error('Failed to fetch statistics:', response.errors);
          setStatistics(localStats.map((stat, index) => ({
            ...stat,
            title:'',
            status: 'new',
            id: `local-${index}`
          })));
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setStatistics(localStats.map((stat, index) => ({
          ...stat,
          title:'',
          status: 'new',
          id: `local-${index}`
        })));
      }
    };

    fetchStatistics();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center transform transition-all duration-300 hover:shadow-xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2"
              >
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  {stat.icon ? (
                    <stat.icon className="w-8 h-8 text-teal-500" />
                  ) : (
                    <Users className="w-8 h-8 text-teal-500" /> // Default icon
                  )}
                </div>
              </motion.div>

              <div className="mt-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="text-4xl font-bold mb-2"
                >
                  {stat.value}{stat.suffix}
                </motion.div>
                <div className="text-lg text-white/80">{stat.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
