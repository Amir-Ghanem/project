import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { teamApi } from '../../../lib/api/teammember';

interface TeamMemberData {
  id: string;
  name: string;
  imageUrl: string | null;
  profilePicture: File | null;
  isActive: boolean;
  status: 'new' | 'existing'; // Add status
  position: string;
  linkedInUrl: string;
  email: string;
  fburl: string;
  displayOrder: number;
}

export function TeamMemberEditor() {
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);

  // Load data on mount
  useEffect(() => {
    const fetchTeamMembers = async () => {
      const response = await teamApi.getAll();
      if (response.isSuccess && response.teamMembers) {
        setTeamMembers(
          response.teamMembers.items.map(member => ({
            id: member.id,
            name: member.name,
            position: member.position,
            imageUrl: member.imageUrl,
            profilePicture: null,
            isActive: member.isActive,
            linkedInUrl : member.linkedInUrl,
            email : member.email,
            fburl : member.fburl,
            displayOrder : member.displayOrder,
            status: 'existing',
          }))
        );
      } else {
        console.error('Failed to fetch team members:', response.errors);
      }
    };
    fetchTeamMembers();
  }, []);

  const addTeamMember = () => {
    const newMember: TeamMemberData = {
      id: Date.now().toString(),
      name: '',
            position: '',
            imageUrl: '',
            profilePicture: null,
            isActive: true,
            linkedInUrl : '',
            email : '',
            fburl : '',
            displayOrder : 1,
      status: 'new',
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const removeTeamMember = async (id: string) => {
    const response = await teamApi.delete(id);
    if (response.isSuccess) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const updateTeamMember = (id: string, field: keyof TeamMemberData, value: string | boolean | File) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const saveChanges = async () => {
    for (const member of teamMembers) {
      const formData = new FormData();

      formData.append('Id', member.id);
      formData.append('Name', member.name);
      formData.append('Position', member.position);
      formData.append('LinkedInUrl', member.linkedInUrl);
      formData.append('Email', member.email);
      formData.append('FBURL', member.fburl);
      formData.append('DisplayOrder', member.displayOrder.toString());
      if (member.profilePicture !== null) {
        formData.append('Image', member.profilePicture);
      }

      formData.append('IsActive', member.isActive.toString());

      if (member.status === 'new') {
        await teamApi.create(formData);
      } else {
        await teamApi.update(formData);
      }
    }

    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Team Members</h2>
        <button
          onClick={addTeamMember}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-gray-50 p-4 rounded-lg relative">
            <button
              onClick={() => removeTeamMember(member.id)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid gap-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                {member.imageUrl && (
                  <div className="mb-2">
                    <img
                      src={`http://35.180.224.195:2712/${member.imageUrl}`}
                      alt="Profile"
                      className="w-full h-auto rounded-lg border"
                      style={{ width: '300px', height: '200px' }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateTeamMember(member.id, 'profilePicture', file);
                    }
                  }}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter name"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={member.position}
                  onChange={(e) => updateTeamMember(member.id, 'position', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Position"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="text"
                  value={member.email}
                  onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="text"
                  value={member.linkedInUrl}
                  onChange={(e) => updateTeamMember(member.id, 'linkedInUrl', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter LinkedIn Url"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                <input
                  type="text"
                  value={member.fburl}
                  onChange={(e) => updateTeamMember(member.id, 'fburl', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Facebook Url"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={member.displayOrder}
                  onChange={(e) => updateTeamMember(member.id, 'displayOrder', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Display Order"
                />
              </div>







              {/* Is Active */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Is Active</label>
                <input
                  type="checkbox"
                  checked={member.isActive}
                  onChange={(e) => updateTeamMember(member.id, 'isActive', e.target.checked)}
                  className="mr-2"
                />
                <span>{member.isActive ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
