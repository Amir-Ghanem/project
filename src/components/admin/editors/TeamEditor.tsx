import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface TeamMemberData {
  id: string;
  name: string;
  position: string;
  image: string;
  social: {
    twitter: string;
    facebook: string;
    linkedin: string;
  };
}

export function TeamEditor() {
  const [members, setMembers] = useState<TeamMemberData[]>([]);

  const addMember = () => {
    const newMember: TeamMemberData = {
      id: Date.now().toString(),
      name: '',
      position: '',
      image: '',
      social: {
        twitter: '',
        facebook: '',
        linkedin: ''
      }
    };
    setMembers([...members, newMember]);
  };

  const removeMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const updateMember = (id: string, field: string, value: string) => {
    setMembers(members.map(member => {
      if (member.id !== id) return member;
      
      if (field.startsWith('social.')) {
        const socialField = field.split('.')[1];
        return {
          ...member,
          social: {
            ...member.social,
            [socialField]: value
          }
        };
      }
      
      return {
        ...member,
        [field]: value
      };
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <button
          onClick={addMember}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      <div className="grid gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-gray-50 p-4 rounded-lg relative">
            <button
              onClick={() => removeMember(member.id)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateMember(member.id, 'name', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter member name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={member.position}
                    onChange={(e) => updateMember(member.id, 'position', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter member position"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={member.image}
                  onChange={(e) => updateMember(member.id, 'image', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Twitter
                  </label>
                  <input
                    type="text"
                    value={member.social.twitter}
                    onChange={(e) => updateMember(member.id, 'social.twitter', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Twitter URL"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Facebook
                  </label>
                  <input
                    type="text"
                    value={member.social.facebook}
                    onChange={(e) => updateMember(member.id, 'social.facebook', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Facebook URL"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={member.social.linkedin}
                    onChange={(e) => updateMember(member.id, 'social.linkedin', e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="LinkedIn URL"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          onClick={() => console.log('Save changes:', members)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}