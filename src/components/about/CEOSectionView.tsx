import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ceoApi } from '../../lib/api/ceo';
import { CEOSection } from '../../lib/types/ceo';

interface CEOData {
  id: string | null;
  title: string;
  image: string;
  description: string;
  name: string;
  position : string;
  pageIdentifier : string;
  imageFile:File | null;
status: 'new' | 'existing';
}
const staticData : CEOData= {
  id: null,
  title: 'Message from Our CEO',
  image:'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  pageIdentifier: 'About',
  description:` With over 20 years of experience in the construction and consulting industry,
                we've built our reputation on trust, innovation, and excellence. Our commitment
                to delivering exceptional results has made us a leader in the field.`,
  imageFile:null,
  name : 'Mohammed ElSheikh',
  position:'CEO',

  status: 'existing',
};
export function CEOSectionView() {

   const [ceos, setCEOs] = useState<CEOData[]>([]);
    useEffect(() => {
      const fetchCEOs = async () => {
        try {
          const response = await ceoApi.getById(null);
          const ceoSection: CEOSection = response.ceo;
          if (response.isSuccess && response.ceo) {
            
            setCEOs([
              {
                  id: ceoSection.id,
                  title: ceoSection.title,
                  image: ceoSection.image,
                  description: ceoSection.describtion,
                  name: ceoSection.name,
                  position : ceoSection.position,
                  pageIdentifier : ceoSection.pageIdentifier,
                  imageFile : null,
                  status: 'existing',
                },
            ]
             
            );
          } 
          console.log(ceos);
          // else {
          //   console.error('Failed to fetch footers:', response.errors);
          // }
        } 
        catch (error) {
          console.error('Error fetching footers:', error);
        }
      };
  
      fetchCEOs();
    }, []);

    const displayData = ceos.length > 0 ? ceos[0] : staticData;
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-teal-500 transform translate-x-4 translate-y-4 -z-10 rounded-lg" />
            <img
              src={displayData.image == ''? `http://http://35.180.224.195:2711/${displayData.image}` :staticData.image } 
              alt="CEO"
              className="rounded-lg shadow-xl"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">{displayData.title ?? staticData.title}</h2>
              <p className="text-gray-600">
                {displayData.description ?? staticData.description}
              </p>
              {/* <p className="text-gray-600">
                We continue to push boundaries and set new standards in the industry,
                always putting our clients' needs first and ensuring we deliver beyond expectations.
              </p> */}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-teal-500">{displayData.name ?? staticData.name}</h3>
              <p className="text-gray-500">{displayData.position ?? staticData.position}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}