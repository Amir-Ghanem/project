import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { missionApi } from '../../../lib/api/mission'; 

interface MissionData {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  iconUrl: string | null;
  iconFile: File | null;
  status: 'new' | 'existing';
}

export function MissionEditor() {
  const [missions, setMissions] = useState<MissionData[]>([]);

  // Load data on mount
  useEffect(() => {
    const fetchMissions = async () => {
      const response = await missionApi.getAll();
      if (response.isSuccess && response.missions?.items) {
        setMissions(
          response.missions.items.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            buttonText: item.buttonText,
            iconUrl: item.iconUrl,
            iconFile: null,
            status: 'existing',
          }))
        );
      } else {
        console.error('Failed to fetch missions:', response.errors);
      }
    };
    fetchMissions();
  }, []);

  const addMission = () => {
    const newMission: MissionData = {
      id: Date.now().toString(),
      title: '',
      description: '',
      buttonText: '',
      iconUrl: null,
      iconFile: null,
      status: 'new',
    };
    setMissions([...missions, newMission]);
  };

  const removeMission = async (id: string) => {
    const response = await missionApi.delete(id);
    if (response.isSuccess) {
      setMissions(missions.filter(mission => mission.id !== id));
    }
  };

  const updateMission = (id: string, field: keyof MissionData, value: string | File) => {
    setMissions(missions.map(mission =>
      mission.id === id ? { ...mission, [field]: value } : mission
    ));
  };

  const saveChanges = async () => {
    for (const mission of missions) {
      const formData = new FormData();
      formData.append('Id', mission.id);
      formData.append('Title', mission.title);
      formData.append('Description', mission.description);
      formData.append('ButtonText', mission.buttonText);
      if (mission.iconFile) {
        formData.append('Icon', mission.iconFile);
      }

      if (mission.status === 'new') {
        await missionApi.create(formData);
      } else {
        await missionApi.update(formData);
      }
    }
    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mission Editor</h2>
        <button
          onClick={addMission}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="w-4 h-4" />
          Add Mission
        </button>
      </div>

      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {missions.map((mission) => (
          <div key={mission.id} className="bg-gray-50 p-4 rounded-lg relative">
            <button
              onClick={() => removeMission(mission.id)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid gap-4">
              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                {mission.iconUrl && (
                  <div className="mb-2">
                    <img
                      src={'http://35.180.224.195:2712/' + mission.iconUrl}
                      alt="Icon"
                      className="w-full h-auto rounded-lg border"
                      style={{ width: '80px', height: '80px' }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateMission(mission.id, 'iconFile', file);
                    }
                  }}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={mission.title}
                  onChange={(e) => updateMission(mission.id, 'title', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter mission title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={mission.description}
                  onChange={(e) => updateMission(mission.id, 'description', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter mission description"
                ></textarea>
              </div>

              {/* Button Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={mission.buttonText}
                  onChange={(e) => updateMission(mission.id, 'buttonText', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter button text"
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
