import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { HeroSection } from '../../../../lib/types/hero';

interface HeroFormProps {
  slide?: HeroSection;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

export function HeroForm({ slide, onSubmit, onCancel }: HeroFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    primaryButtonText: '',
    primaryButtonUrl: '',
    secondaryButtonText: '',
    secondaryButtonUrl: '',
    pageIdentifier: 'Home',
    isActive: true
  });
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);

  useEffect(() => {
    if (slide) {
      setFormData({
        title: slide.title || '',
        subtitle: slide.subtitle || '',
        primaryButtonText: slide.primaryButtonText || '',
        primaryButtonUrl: slide.primaryButtonUrl || '',
        secondaryButtonText: slide.secondaryButtonText || '',
        secondaryButtonUrl: slide.secondaryButtonUrl || '',
        pageIdentifier: slide.pageIdentifier,
        isActive: slide.isActive
      });
    }
  }, [slide]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();

    // Add all form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value.toString());
    });

    // Add image if selected
    if (backgroundImage) {
      submitData.append('BackgroundImage', backgroundImage);
    }

    // Add ID if editing
    if (slide?.id) {
      submitData.append('Id', slide.id);
    }

    await onSubmit(submitData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setBackgroundImage(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {slide ? 'Edit Hero Section' : 'Create Hero Section'}
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Button Text
              </label>
              <input
                type="text"
                value={formData.primaryButtonText}
                onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Button URL
              </label>
              <input
                type="text"
                value={formData.primaryButtonUrl}
                onChange={(e) => setFormData({ ...formData, primaryButtonUrl: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Button Text
              </label>
              <input
                type="text"
                value={formData.secondaryButtonText}
                onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Button URL
              </label>
              <input
                type="text"
                value={formData.secondaryButtonUrl}
                onChange={(e) => setFormData({ ...formData, secondaryButtonUrl: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded border-gray-300"
              id="isActive"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Is Active
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            >
              {slide ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}