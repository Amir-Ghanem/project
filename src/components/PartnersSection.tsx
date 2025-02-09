// import { motion } from 'framer-motion';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import { Building2 } from 'lucide-react';
// import 'swiper/css';
// import { partnersApi } from '../lib/api/partner';
// import { useEffect, useState } from 'react';

// const partners = Array(8).fill(null).map((_, i) => ({
//   name: `Partner ${i + 1}`,
//   icon: Building2
// }));

// interface PartnerData {
//   id: string;
//   name: string;
//   websiteUrl: string;
//   partnerType: string;
//   image: string | null;
  
// }
// export function PartnersSection() {
//    const [partners, setPartners] = useState<PartnerData[]>([]);
  
//     useEffect(() => {
//       const fetchPartners = async () => {
//         const response = await partnersApi.getAll();
//         if (response.isSuccess && response.partners?.items) {
//           setPartners(
//             response.partners.items.map((item: any) => ({
//               id: item.id,
//               name: item.name,
//               websiteUrl: item.websiteUrl,
//               partnerType: item.partnerType,
//               image: item.image,

//             }))
//           );
//         } else {
//           console.error('Failed to fetch partners:', response.errors, response);
//         }
//       };
//       fetchPartners();
//     }, []);
  
//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-4xl font-bold text-center mb-12"
//         >
//           Our Partners
//         </motion.h2>
//         <div className="relative">
//           <Swiper
//             modules={[Autoplay]}
//             slidesPerView={2}
//             breakpoints={{
//               640: { slidesPerView: 3 },
//               768: { slidesPerView: 4 },
//               1024: { slidesPerView: 6 }
//             }}
//             autoplay={{ delay: 2000 }}
//             loop
//             className="partners-slider"
//           >
//             {partners.map((partner, index) => (
//               <SwiperSlide key={index}>
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex flex-col items-center justify-center p-4"
//                 >
//                   <partner.icon className="w-16 h-16 text-teal-500 mb-2" />
//                   <p className="text-center font-medium">{partner.name}</p>
//                 </motion.div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   );
// }
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Building2 } from 'lucide-react';
import 'swiper/css';
import { partnersApi } from '../lib/api/partner';
import { useEffect, useState } from 'react';

const staticPartners = Array(10).fill(null).map((_, i) => ({
  id: `static-${i}`,
  name: `Static Partner ${i + 1}`,
  websiteUrl: "#",
  partnerType: "Partner",
  image: null,
}));

interface PartnerData {
  id: string;
  name: string;
  websiteUrl: string;
  partnerType: string;
  image: string | null;
}

export function PartnersSection() {
  const [partners, setPartners] = useState<PartnerData[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await partnersApi.getAll();
        if (response.isSuccess && response.partners?.items) {
          const filteredPartners = response.partners.items
            .filter((item: any) => item.partnerType === "Partner")
            .slice(0, 10) // Limit to 10 elements
            .map((item: any) => ({
              id: item.id,
              name: item.name,
              websiteUrl: item.websiteUrl || "#",
              partnerType: item.partnerType,
              image: item.image,
            }));
          setPartners(filteredPartners);
        } else {
          console.error('Failed to fetch partners:', response.errors);
        }
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchPartners();
  }, []);

  const displayedPartners = partners.length > 0 ? partners : staticPartners;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Partners
        </motion.h2>
        <div className="relative">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            autoplay={{ delay: 2000 }}
            loop
            className="partners-slider"
          >
            {displayedPartners.map((partner, index) => (
              <SwiperSlide key={partner.id}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center justify-center p-4 cursor-pointer"
                  onClick={() => partner.websiteUrl && window.open(partner.websiteUrl, '_blank')}
                >
                  {partner.image ? (
                    <img
                      src={`http://35.180.224.195:2711/${partner.image ?? ''}`}
                      alt={partner.name}
                      className="w-16 h-16 rounded-full object-cover mb-2"
                    />
                  ) : (
                    <Building2 className="w-16 h-16 text-teal-500 mb-2" />
                  )}
                  <p className="text-center font-medium">{partner.name}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
