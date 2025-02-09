import { useState, useEffect } from 'react';
import { teamApi } from '../../../lib/api/team';
import { TeamSectionData, UpdateTeamSectionRequest } from '../../../lib/types/teamSeaction';

interface TeamSectionState extends TeamSectionData {
  status: 'new' | 'existing';
}

export function TeamSectionEditor() {
  const [teamSections, setTeamSections] = useState<TeamSectionState[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamSection = async () => {
      try {
        const response = await teamApi.getById(currentId);
        if(response.isSuccess && !response.teamSections){
            setTeamSections([
                {
                    id: null,
                    title: '',
                    subtitle: '',
                    description: '',
                    isActive: false,
                    buttonText : '',
                    buttonURL : '',
                    pageIdentifier : '',
                    status: 'existing',
                  },
              ]
             
              );
        }
        if (response.isSuccess && response.teamSections) {
          const section = response.teamSections;
          setTeamSections([
            {
              id :section.id,
              title:section.title,
              subtitle:section.subtitle,
              description : section.description,
              isActive : section.isActive,
              buttonText : section.buttonText,
              buttonURL : section.buttonURL,
              pageIdentifier : section.pageIdentifier,
              status: 'existing',
            },
          ]);
          setCurrentId(section.id);
        } else {
          console.error('Failed to fetch team sections:', response.errors);
        }
      } catch (error) {
        console.error('Error fetching team sections:', error);
      }
    };

    fetchTeamSection();
  }, [currentId]);

  const updateTeamSection = (id: string | null, field: keyof TeamSectionState, value: any) => {
    setTeamSections(
      teamSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const saveChanges = async () => {
    for (const section of teamSections) {
      const requestData: UpdateTeamSectionRequest = {
        id: section.id,
        title: section.title,
        subtitle: section.subtitle,
        description: section.description,
        isActive: section.isActive,
        buttonText: section.buttonText,
        buttonURL: section.buttonURL,
        pageIdentifier: section.pageIdentifier,
      };

      try {
        await teamApi.update(requestData);
      } catch (error) {
        console.error('Error saving team section:', error);
      }
    }

    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {teamSections.map((section) => (
          <div key={section.id} className="bg-gray-50 p-4 rounded-lg relative">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateTeamSection(section.id, 'title', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={section.subtitle}
                  onChange={(e) => updateTeamSection(section.id, 'subtitle', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={section.description}
                  onChange={(e) => updateTeamSection(section.id, 'description', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={section.buttonText}
                  onChange={(e) => updateTeamSection(section.id, 'buttonText', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button URL</label>
                <input
                  type="text"
                  value={section.buttonURL}
                  onChange={(e) => updateTeamSection(section.id, 'buttonURL', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Identifier</label>
                <input
                  type="text"
                  value={section.pageIdentifier}
                  onChange={(e) => updateTeamSection(section.id, 'pageIdentifier', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-2">Is Active</label>
                <input
                  type="checkbox"
                  checked={section.isActive}
                  onChange={(e) => updateTeamSection(section.id, 'isActive', e.target.checked)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={saveChanges}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
