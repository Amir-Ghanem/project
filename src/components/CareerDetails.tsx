import { useEffect, useState } from 'react';
import { Career } from '../lib/types/career';
import { careerApi } from '../lib/api/career';
import { useNavigate, useParams } from 'react-router-dom';


const CareerDetails = () => {
  const [career, setSelectedCareer] = useState<Career | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>(); // Get the blog ID from the route params
const navigate = useNavigate();

 useEffect(() => {
   const fetchCareerById = async () => {
       try {
        if(!id) return;
         const response = await careerApi.getById(id);
         if (response.isSuccess && response.career) {
           setSelectedCareer(response.career);
         } else {
           setError(response.errors.join(', ') || 'Failed to fetch career details.');
         }
       } catch (err) {
         setError('An error occurred while fetching career details.');
         
         console.error(err);
       }
     };

     if(id){
        fetchCareerById();
     }
    
  }, [id]);
  if (!career) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <button
        onClick={() => navigate(-1)}
        className="text-teal-600 hover:underline mb-4"
      >
        Back to Career List
      </button>
      <h2 className="text-2xl font-bold text-teal-600 mb-4">
        {career!.fullname}'s Application
      </h2>
      <p>
        <strong>Email:</strong> {career!.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {career!.phoneNumber}
      </p>
      <p>
        <strong>Position:</strong> {career!.position}
      </p>
      <p className="mt-4">
        <strong>Links:</strong>
      </p>
      <ul className="list-disc pl-6">
        {career!.links.map((link: string , index: number ) => (
          <li key={index}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              Link {index + 1}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <strong>CV:</strong>
        <div className="mt-2">
       {career!.cvurl ? (

<img
             
             src={`http://35.180.224.195:2711/${career!.cvurl}`}
               alt="CV"
             className="rounded-lg shadow-lg"
           />
       ):(

        <>  </>
       )}
            
    
        </div>
      </div>
      <div className="mt-6">
        <strong>Portfolio Images:</strong>
        <div className="grid grid-cols-2 gap-4 mt-2">
        <img
             
             src={`http://35.180.224.195:2711/${career!.portfolioURL}`}
                alt="Portfolio Image"
             className="rounded-lg shadow-lg"
           />
        </div>
      </div>
    </div>
  );
};

export default CareerDetails;
