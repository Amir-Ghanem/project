// import { motion } from 'framer-motion';
// import { Target, Eye, Goal } from 'lucide-react';
// import { cn } from '../lib/utils';
// import { useEffect, useState } from 'react';
// import { missionApi } from '../lib/api/mission';

// const cards = [
//   {
//     title: "Strategic Mission",
//     description: "Empowering businesses through innovative solutions and transformative strategies that drive sustainable growth.",
//     icon: Target,
//     color: "from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30"
//   },
//   {
//     title: "Future Vision",
//     description: "Leading the industry in consulting excellence, setting new standards for professional service and client success.",
//     icon: Eye,
//     color: "from-teal-500/20 to-teal-600/20 hover:from-teal-500/30 hover:to-teal-600/30"
//   },
//   {
//     title: "Core Goals",
//     description: "Creating lasting value through measurable results, innovative solutions, and strategic partnerships.",
//     icon: Goal,
//     color: "from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30"
//   }
// ];
// interface MissionData {
//   id: string;
//   title: string;
//   description: string;
//   buttonText: string;
//   iconUrl: string | null;
//   iconFile: File | null;
// }

// export function MissionSection() {

//   const [missions, setMissions] = useState<MissionData[]>([]);

//   // Load data on mount
//   useEffect(() => {
//     const fetchMissions = async () => {
//       const response = await missionApi.getAll();
//       if (response.isSuccess && response.missions?.items) {
//         setMissions(
//           response.missions.items.map(item => ({
//             id: item.id,
//             title: item.title,
//             description: item.description,
//             buttonText: item.buttonText,
//             iconUrl: item.iconUrl,
//             iconFile: null,
//             status: 'existing',
//           }))
//         );
//       } else {
//         console.error('Failed to fetch missions:', response.errors);
//       }
//     };
//     fetchMissions();
//   }, []);

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold mb-4">Strategic Excellence</h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Driving innovation and excellence through our core principles
//           </p>
//         </motion.div>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {cards.map((card, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.2 }}
//               whileHover={{ scale: 1.02 }}
//               className={cn(
//                 "relative p-8 rounded-2xl bg-gradient-to-br shadow-lg backdrop-blur-sm",
//                 "transform transition-all duration-300",
//                 "border border-white/20",
//                 card.color
//               )}
//             >
//               <motion.div
//                 initial={{ scale: 0 }}
//                 whileInView={{ scale: 1 }}
//                 transition={{ delay: index * 0.2 + 0.3 }}
//                 className="absolute -top-6 left-1/2 -translate-x-1/2"
//               >
//                 <div className="bg-white p-4 rounded-xl shadow-lg">
//                   <card.icon className="w-8 h-8 text-teal-500" />
//                 </div>
//               </motion.div>
              
//               <div className="mt-8 text-center">
//                 <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
//                 <p className="text-gray-600">{card.description}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { motion } from 'framer-motion';
import { Target, Eye, Goal } from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect, useState } from 'react';
import { missionApi } from '../lib/api/mission';

const defaultCards = [
  {
    title: "Strategic Mission",
    description: "Empowering businesses through innovative solutions and transformative strategies that drive sustainable growth.",
    iconUrl: Target,
    color: "from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30"
  },
  {
    title: "Future Vision",
    description: "Leading the industry in consulting excellence, setting new standards for professional service and client success.",
    iconUrl: Eye,
    color: "from-teal-500/20 to-teal-600/20 hover:from-teal-500/30 hover:to-teal-600/30"
  },
  {
    title: "Core Goals",
    description: "Creating lasting value through measurable results, innovative solutions, and strategic partnerships.",
    iconUrl: Goal,
    color: "from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30"
  }
];

// interface MissionData {
//   id: string;
//   title: string;
//   description: string;
//   buttonText: string;
//   iconUrl: string | null;
//   iconFile: File | null;
// }

export function MissionSection() {
  // const [missions, setMissions] = useState<MissionData[]>([]);
  
  const [missionCard, setMissionCard] = useState(defaultCards[0]);
  const [visionCard, setVisionCard] = useState(defaultCards[1]);
  const [goalCard, setGoalCard] = useState(defaultCards[2]);

  // Load data on mount
  useEffect(() => {
    const fetchMissions = async () => {
      const response = await missionApi.getAll();
      if (response.isSuccess && response.missions?.items) {
        const apiMissions = response.missions.items;
        
        // Map the API response to the correct cards
        const mission = apiMissions.find(item => item.title?.toLowerCase().includes("mission"));
        const vision = apiMissions.find(item => item.title?.toLowerCase().includes("vision"));
        const goal = apiMissions.find(item => item.title?.toLowerCase().includes("goal"));
        
        console.log(mission);
        console.log(vision);
        console.log(goal);
        setMissionCard({
          title: mission?.title ?? defaultCards[0].title,
          description: mission?.description ?? defaultCards[0].description,
          iconUrl: defaultCards[0].iconUrl,
          color:  defaultCards[0].color
        });

        setVisionCard({
          title: vision?.title || defaultCards[1].title,
          description: vision?.description || defaultCards[1].description,
          iconUrl:  defaultCards[1].iconUrl,
          color:defaultCards[1].color
        });

        setGoalCard({
          title: goal?.title || defaultCards[2].title,
          description: goal?.description || defaultCards[2].description,
          iconUrl:  defaultCards[2].iconUrl,
          color: defaultCards[2].color
        });

        
      } else {
        console.error('Failed to fetch missions:', response.errors);
      }
    };
    fetchMissions();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Strategic Excellence</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Driving innovation and excellence through our core principles
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "relative p-8 rounded-2xl bg-gradient-to-br shadow-lg backdrop-blur-sm",
              "transform transition-all duration-300",
              "border border-white/20",
              missionCard.color
            )}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2"
            >
              <div className="bg-white p-4 rounded-xl shadow-lg">
                {<missionCard.iconUrl/>}
              </div>
            </motion.div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{missionCard.title}</h3>
              <p className="text-gray-600">{missionCard.description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "relative p-8 rounded-2xl bg-gradient-to-br shadow-lg backdrop-blur-sm",
              "transform transition-all duration-300",
              "border border-white/20",
              visionCard.color
            )}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2"
            >
              <div className="bg-white p-4 rounded-xl shadow-lg">
                {<visionCard.iconUrl />}
              </div>
            </motion.div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{visionCard.title}</h3>
              <p className="text-gray-600">{visionCard.description}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "relative p-8 rounded-2xl bg-gradient-to-br shadow-lg backdrop-blur-sm",
              "transform transition-all duration-300",
              "border border-white/20",
              goalCard.color
            )}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2"
            >
              <div className="bg-white p-4 rounded-xl shadow-lg">
                {<goalCard.iconUrl className="w-8 h-8 text-teal-500"/>}
              </div>
            </motion.div>
         

            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold mb-4">{goalCard.title}</h3>
              <p className="text-gray-600">{goalCard.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
