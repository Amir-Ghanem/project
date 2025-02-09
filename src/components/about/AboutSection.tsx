import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { aboutApi } from '../../lib/api/about';

const features = [
  "Industry-leading expertise",
  "Innovative solutions",
  "Sustainable practices",
  "Client-focused approach"
];

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
  const [slides, setSlides] = useState<SlideData[]>([]);

  const staticData: SlideData = {
    id: null,
    title: 'Who We Are',
    content: 'We are a leading construction consulting firm dedicated to delivering innovative solutions and exceptional results for our clients across the region.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    secondImageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    imageFile: null,
    secondImageFile: null,
    buttonText: 'Learn More',
    buttonUrl: '#',
    isActive: true,
    aboutList: features,
    aboutListString: features.join(', '),
    noOfYearsExp: '16+',
    noOfYearsExpLabel: 'Years Experience',
    pageIdentifier: 'Home',
    status: 'existing',
  };

  useEffect(() => {
    const fetchSlides = async () => {
      const response = await aboutApi.getAll();
      if (response.isSuccess && response.aboutSections?.items) {
        setSlides(
          response.aboutSections.items
          .filter((item: any) => item.pageIdentifier === "About")
          .map((item) => ({
            id: item.id,
            title: item.title,
            isActive: item.isActive,
            status: 'existing',
            content: item.content,
            imageUrl: item.imageUrl,
            secondImageUrl: item.secondImageUrl,
            imageFile: null,
            secondImageFile: null,
            buttonText: item.buttonText,
            buttonUrl: item.buttonUrl,
            aboutList: item.aboutList,
            aboutListString: item.aboutListString,
            noOfYearsExp: item.noOfYearsExp,
            noOfYearsExpLabel: item.noOfYearsExpLabel,
            pageIdentifier: item.pageIdentifier,
          }))
        );
      } else {
        console.error('Failed to fetch slides:', response.errors, response);
      }
    };
    fetchSlides();
  }, []);

  // Use API data if available, otherwise fallback to static data
  const displayData = slides.length > 0 ? slides[0] : staticData;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 grid grid-cols-2 gap-6"
          >
            <div className="relative h-[300px]">
              <img
                src={`http://35.180.224.195:2711/${displayData.imageUrl ?? ''}`}
                alt="Office"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
            <div className="relative h-[300px] mt-12">
              <img
                src={`http://35.180.224.195:2711/${displayData.secondImageUrl ?? ''}`}
                alt="Team"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-5xl font-bold text-teal-500 mb-2">{displayData.noOfYearsExp}</div>
              <div className="text-xl font-semibold mb-1">{displayData.noOfYearsExpLabel}</div>
              <div className="text-gray-600">In Construction Industry</div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold">{displayData.title}</h2>
              <p className="text-gray-600">{displayData.content}</p>
              <ul className="space-y-3">
                {displayData.aboutList.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-teal-500" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href={displayData.buttonUrl} className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition-colors">
                {displayData.buttonText}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
