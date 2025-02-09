import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { statisticsApi } from '../../../lib/api/statistics';

interface StatisticData {
  id: string;
  title: string;
  value: string;
  status: 'new' | 'existing';
}

export function StatisticsEditor() {
  const [statistics, setStatistics] = useState<StatisticData[]>([]);

  // Load data on mount
  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await statisticsApi.getAll();
      if (response.isSuccess && response.statistics?.items) {
        setStatistics(
          response.statistics.items.map(item => ({
            id: item.id,
            title: item.title,
            value: item.value,
            status: 'existing',
          }))
        );
      } else {
        console.error('Failed to fetch statistics:', response.errors);
      }
    };
    fetchStatistics();
  }, []);

  const addStatistic = () => {
    const newStatistic: StatisticData = {
      id: Date.now().toString(),
      title: '',
      value: '',
      status: 'new',
    };
    setStatistics([...statistics, newStatistic]);
  };

  const removeStatistic = async (id: string) => {
    const response = await statisticsApi.delete(id);
    if (response.isSuccess) {
      setStatistics(statistics.filter(stat => stat.id !== id));
    }
  };

  const updateStatistic = (id: string, field: keyof StatisticData, value: string) => {
    setStatistics(statistics.map(stat =>
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
  };

  const saveChanges = async () => {
    for (const stat of statistics) {
      if (stat.status === 'new') {
        await statisticsApi.create({ title: stat.title, value: stat.value });
      } else {
        await statisticsApi.update({ id: stat.id, title: stat.title, value: stat.value });
      }
    }
    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Statistics Editor</h2>
        <button
          onClick={addStatistic}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="w-4 h-4" />
          Add Statistic
        </button>
      </div>

      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {statistics.map(stat => (
          <div key={stat.id} className="bg-gray-50 p-4 rounded-lg relative">
            <button
              onClick={() => removeStatistic(stat.id)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={stat.title}
                  onChange={e => updateStatistic(stat.id, 'title', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter statistic title"
                />
              </div>

              {/* Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={e => updateStatistic(stat.id, 'value', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter statistic value"
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
