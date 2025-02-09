import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { HeroTable } from './HeroTable';
import { HeroForm } from './HeroForm';
import { HeroDetails } from './HeroDetails';
import { heroApi } from '../../../../lib/api/hero';
import { HeroSection } from '../../../../lib/types/hero';
import { toast } from 'react-hot-toast';

export function HeroEditor() {
  const [sections, setSections] = useState<HeroSection[]>([]);
  const [selectedSection, setSelectedSection] = useState<HeroSection | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSections = async () => {
    try {
      setIsLoading(true);
      const response = await heroApi.getAll();
      if (response.heroSections?.items) {
        setSections(response.heroSections.items);
      }
    } catch (error) {
      toast.error('Failed to fetch hero sections');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleCreate = async (data: FormData) => {
    try {
      await heroApi.create(data);
      toast.success('Hero section created successfully');
      fetchSections();
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Failed to create hero section');
    }
  };

  const handleUpdate = async (data: FormData) => {
    try {
      await heroApi.update(data);
      toast.success('Hero section updated successfully');
      fetchSections();
      setIsFormOpen(false);
      setSelectedSection(null);
    } catch (error) {
      toast.error('Failed to update hero section');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero section?')) return;

    try {
      await heroApi.delete(id);
      toast.success('Hero section deleted successfully');
      fetchSections();
    } catch (error) {
      toast.error('Failed to delete hero section');
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await heroApi.getById(id);
      if (response.heroSection) {
        setSelectedSection(response.heroSection);
        setIsFormOpen(true);
      }
    } catch (error) {
      toast.error('Failed to fetch hero section details');
    }
  };

  const handleView = async (id: string) => {
    try {
      const response = await heroApi.getById(id);
      if (response.heroSection) {
        setSelectedSection(response.heroSection);
        setIsDetailsOpen(true);
      }
    } catch (error) {
      toast.error('Failed to fetch hero section details');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Hero Sections</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="w-4 h-4" />
          Add Section
        </button>
      </div>

      <HeroTable
        sections={sections}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {isFormOpen && (
        <HeroForm
          slide={selectedSection || undefined}
          onSubmit={selectedSection ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedSection(null);
          }}
        />
      )}

      {isDetailsOpen && selectedSection && (
        <HeroDetails
          section={selectedSection}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedSection(null);
          }}
        />
      )}
    </div>
  );
}