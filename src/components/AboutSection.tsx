// import { motion } from 'framer-motion';
// import { ArrowRight } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { aboutApi } from '../lib/api/about';
// interface SlideData {
//   id: string|null;
//   title: string;
//   content: string;
//   imageUrl: string;
//   secondImageUrl: string;
//   imageFile: File|null;
//   secondImageFile: File | null;
//   buttonText: string;
//   buttonUrl: string;
//   isActive: boolean;
//   aboutList: string[];
//   aboutListString: string;
//   noOfYearsExp: string;
//   noOfYearsExpLabel: string;
//   pageIdentifier: "Home" | string; 
//   status: 'new' | 'existing'; // Add status
// }
// export function AboutSection() {

//    const [slides, setSlides] = useState<SlideData[]>([]);
  
//     // Load data on mount
//     useEffect(() => {
//       const fetchSlides = async () => {
//         const response = await aboutApi.getAll();
//         if (response.isSuccess && response.aboutSections?.items) {
//           setSlides(
//             response.aboutSections.items.map(item => ({
//               id: item.id,
//               title: item.title,
//               isActive: item.isActive,
//               status: 'existing',
//               content : item.content,
//               imageUrl : item.imageUrl,
//               secondImageUrl : item.secondImageUrl,
//               imageFile : null,
//               secondImageFile : null,
//               buttonText:item.buttonText,
//               buttonUrl: item.buttonUrl,
//               aboutList : item.aboutList,
//               aboutListString : item.aboutListString,
//               noOfYearsExp : item.noOfYearsExp,
//               noOfYearsExpLabel : item.noOfYearsExpLabel,
//               pageIdentifier : item.pageIdentifier
//             }))
//           );
//         } else {
//           console.error('Failed to fetch slides:', response.errors,response);
//         }
//       };
//       fetchSlides();
//     }, []);
    
//   return (
//     <section className="py-20">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="relative"
//           >
//             <div className="absolute inset-0 bg-teal-500 transform translate-x-4 translate-y-4 -z-10 rounded-lg" />
//             <img
//               src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
//               alt="About Us"
//               className="rounded-lg shadow-xl"
//             />
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-4xl font-bold mb-6">About Us</h2>
//             <p className="text-gray-600 mb-6">
//               We are a specialized consulting company committed to delivering innovative solutions
//               and strategic guidance to our clients. With years of experience and a dedicated team
//               of experts, we help businesses achieve their goals and overcome challenges.
//             </p>
//             <a href="#" className="inline-flex items-center text-teal-500 hover:text-teal-600">
//               Read More <ArrowRight className="ml-2 h-4 w-4" />
//             </a>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }



import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { aboutApi } from '../lib/api/about';

interface SlideData {
  id: string | null;
  title: string;
  content: string;
  imageUrl: string;
  secondImageUrl: string;
  imageFile: File | null;
  secondImageFile: File | null;
  buttonText: string;
  buttonUrl: string;
  isActive: boolean;
  aboutList: string[];
  aboutListString: string;
  noOfYearsExp: string;
  noOfYearsExpLabel: string;
  pageIdentifier: "Home" | string;
  status: 'new' | 'existing'; // Add status
}

export function AboutSection() {
  const [slide, setSlide] = useState<SlideData | null>(null);

  // Static fallback data
  const staticData: SlideData = {
    id: null,
    title: 'About Us',
    content: 'We are a specialized consulting company committed to delivering innovative solutions and strategic guidance to our clients. With years of experience and a dedicated team of experts, we help businesses achieve their goals and overcome challenges.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    secondImageUrl: '',
    imageFile: null,
    secondImageFile: null,
    buttonText: 'Read More',
    buttonUrl: '#',
    isActive: true,
    aboutList: [],
    aboutListString: '',
    noOfYearsExp: '5',
    noOfYearsExpLabel: 'Years of Experience',
    pageIdentifier: 'Home',
    status: 'existing'
  };

  // Load data on mount
  useEffect(() => {
    const fetchSlides = async () => {
      const response = await aboutApi.getAll();
      if (response.isSuccess && response.aboutSections?.items) {
        // Filter out the item with pageIdentifier equal to 'Home'
        const homeSlide = response.aboutSections.items.find(
          (item) => item.pageIdentifier === 'Home'
        );

        // Set the first item with pageIdentifier 'Home' or fallback to static data
        if (homeSlide) {
          setSlide({
            id: homeSlide.id,
            title: homeSlide.title,
            content: homeSlide.content,
            imageUrl: homeSlide.imageUrl,
            secondImageUrl: homeSlide.secondImageUrl,
            imageFile: null,
            secondImageFile: null,
            buttonText: homeSlide.buttonText,
            buttonUrl: homeSlide.buttonUrl,
            isActive: homeSlide.isActive,
            aboutList: homeSlide.aboutList,
            aboutListString: homeSlide.aboutListString,
            noOfYearsExp: homeSlide.noOfYearsExp,
            noOfYearsExpLabel: homeSlide.noOfYearsExpLabel,
            pageIdentifier: homeSlide.pageIdentifier,
            status: 'existing'
          });
        } else {
          setSlide(staticData);
        }
      } else {
        console.error('Failed to fetch slides:', response.errors, response);
        setSlide(staticData); // Set static data if API fails
      }
    };

    fetchSlides();
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-teal-500 transform translate-x-4 translate-y-4 -z-10 rounded-lg" />
            <img
              src={`http://35.180.224.195:2711/${slide?.imageUrl ?? staticData.imageUrl}`} // Prepend base URL to the image URL
              alt="About Us"
              className="rounded-lg shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">{slide?.title ?? staticData.title}</h2>
            <p className="text-gray-600 mb-6">{slide?.content ?? staticData.content}</p>
            <a href={slide?.buttonUrl ?? staticData.buttonUrl} className="inline-flex items-center text-teal-500 hover:text-teal-600">
              {slide?.buttonText ?? staticData.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
