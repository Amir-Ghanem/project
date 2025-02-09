import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { useEffect, useState } from 'react';
import { partnersApi } from '../lib/api/partner';

interface PartnerData {
  name: string;
  description: string;
  year: string;
  image: string | null;
  websiteUrl: string | null;
}

const staticTrustedBy = [
  { name: "Saudi Aramco", description: "Energy Partner", year: "Since 2018", image: null, websiteUrl: "#" },
  { name: "SABIC", description: "Industrial Partner", year: "Since 2019", image: null, websiteUrl: "#" },
  { name: "Saudi Electricity Company", description: "Utility Partner", year: "Since 2017", image: null, websiteUrl: "#" },
  { name: "Ministry of Housing", description: "Government Partner", year: "Since 2020", image: null, websiteUrl: "#" },
  { name: "Royal Commission", description: "Strategic Partner", year: "Since 2016", image: null, websiteUrl: "#" },
  { name: "NEOM", description: "Innovation Partner", year: "Since 2021", image: null, websiteUrl: "#" },
];

export function TrustedBySection() {
  const [trustedBy, setTrustedBy] = useState<PartnerData[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await partnersApi.getAll();
        if (response.isSuccess && response.partners?.items) {
          const filteredPartners = response.partners.items
            .filter((item: any) => item.partnerType === "Client")
            .map((item: any) => ({
              name: item.name,
              description: item.partnerType || "Partner",
              year: `Since ${new Date(item.creationDate).getFullYear()}`,
              image: item.image || null,
              websiteUrl: item.websiteUrl || null,
            }));

          setTrustedBy(filteredPartners.slice(0, 10));
        } else {
          console.error('Failed to fetch partners:', response.errors);
        }
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchPartners();
  }, []);

  const displayedData = trustedBy.length > 0 ? trustedBy : staticTrustedBy.slice(0, 10);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Trusted By Industry Leaders</h2>
          <p className="text-gray-600">Partnering with the region's most innovative organizations</p>
        </motion.div>

        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay, EffectCoverflow]}
          className="py-12"
        >
          {displayedData.map((company, index) => (
            <SwiperSlide key={index} className="w-[200px] sm:w-[250px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg backdrop-blur-sm cursor-pointer"
                onClick={() => company.websiteUrl && window.open(company.websiteUrl, '_target')}
              >
                {company.image ? (
                  <img
                  src={`http://35.180.224.195:2711/${company.image}`}
                    alt={company.name}
                    className="w-32 h-32 mx-auto object-contain mb-6"
                  />
                ) : (
                  <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-6">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{company.name}</h3>
                <p className="text-gray-600 mb-4">{company.description}</p>
                {/* <p className="text-sm text-teal-500">{company.year}</p> */}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
