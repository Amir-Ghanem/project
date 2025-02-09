import React, { useEffect, useState } from 'react';
import { careerApi } from '../../../lib/api/career';
import CareerDetails from '../../CareerDetails';
import { Modal } from '@mui/material';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface Career {
  id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  position: string;
  links: string[];
  isRead: boolean;
  cvurl: string;
  portfolioURL: string;
}

const CareerList = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [links, setLinks] = useState<string[] | null>(null);
const navigate = useNavigate();
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await careerApi.getAll();
        if (response.isSuccess && response.careers?.items) {
          setCareers(response.careers.items);
        } else {
          setError(response.errors.join(', ') || 'Failed to fetch careers.');
        }
      } catch (err) {
        setError('An error occurred while fetching careers.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  

  if (isLoading) return <div className="text-center py-10">Loading careers...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (careers.length === 0) return <div className="text-center py-10">No careers available.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-teal-600 text-center mb-8">Career Applications</h1>
      
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone Number</th>
                <th className="py-3 px-4 text-left">Position</th>
                <th className="py-3 px-4 text-left">Links</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((career) => (
                <tr
                  key={career.id}
                  className="border-b hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => navigate('/admin/careers/' + career.id)}
                >
                  <td className="py-3 px-4">{career.fullname}</td>
                  <td className="py-3 px-4">{career.email}</td>
                  <td className="py-3 px-4">{career.phoneNumber}</td>
                  <td className="py-3 px-4">{career.position}</td>
                  <td className="py-3 px-4">
                    <button
                      className="text-teal-600 underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLinks(career.links);
                      }}
                    >
                      View Links
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${career.isRead ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {career.isRead ? 'Read' : 'Unread'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
      
      

      {links && (
        
<Modal open={!!links} onClose={() => setLinks(null)}>
  <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto">
    {/* Modal Header */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-semibold text-gray-800">Career Links</h2>
      <button onClick={() => setLinks(null)} className="text-gray-500 hover:text-gray-700">
        <X size={24} />
      </button>
    </div>

    {/* Modal Body */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2">
      {links.map((link, index) => (
        <a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          🔗 Link {index + 1}
        </a>
      ))}
    </div>
  </div>
</Modal>
      )}
    </div>
  );
};

export default CareerList;
