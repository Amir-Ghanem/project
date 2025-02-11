import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { teamApi } from '../../lib/api/teammember';

const localTeam = [
  {
    name: "John Smith",
    position: "CEO & Founder",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
   
      X: "#",
      facebook: "#",
      linkedin: "#"
    
  },
  {
    name: "Sarah Johnson",
    position: "Technical Director",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",

      X: "#",
      facebook: "#",
      linkedin: "#"

  },
  {
    name: "Michael Chen",
    position: "Lead Architect",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",

      X: "#",
      facebook: "#",
      linkedin: "#"
 
  }
];

interface TeamMemberData {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  linkedInUrl: string;
  email: string;
  fburl: string;
  displayOrder: number;
  isActive: boolean;
  
}

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await teamApi.getAll();
        if (response.isSuccess && response.teamMembers?.items) {
          setTeamMembers(
            response.teamMembers.items.map(member => ({
              id: member.id,
              name: member.name,
              position: member.position,
              imageUrl: member.imageUrl || "",
             displayOrder : member.displayOrder,
             isActive : member.isActive,
             email : member.email,
                fburl: member.fburl || "#",
                linkedInUrl: member.linkedInUrl || "#",
           
            }))
          );
        } else {
          setTeamMembers(localTeam.map(member => ({
            id: "",
            name: member.name,
            position: member.position,
            imageUrl: member.imageUrl,
            profilePicture: null,
            isActive: true,
            linkedInUrl: member.linkedin,
            email: "",
            fburl: member.facebook,
            displayOrder: 0,
            status: 'new',

          })));
        }
      } catch (error) {
        console.error("Failed to fetch team members:", error);
        setTeamMembers(localTeam.map(member => ({
          id: "",
          name: member.name,
          position: member.position,
          imageUrl: member.imageUrl,
          profilePicture: null,
          isActive: true,
          linkedInUrl: member.linkedin,
          email: "",
          fburl: member.facebook,
          displayOrder: 0,
          status: 'new', 
        })));
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our diverse team of experts brings together years of experience and innovation.
          </p>
          <button className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition-colors">
            Join Our Team
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <img
                  src={`http://35.180.224.195:2712/${member.imageUrl}`} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] bg-white p-4 rounded-xl shadow-xl"
              >
                <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                <p className="text-gray-500 text-center mb-3">{member.position}</p>
                <div className="flex justify-center space-x-4">
                  {[
                    { icon: Facebook, link: member.fburl },
                    { icon: X, link: member.email },
                    { icon: Linkedin, link: member.linkedInUrl }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      className="text-gray-400 hover:text-teal-500 transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
