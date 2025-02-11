import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { serviceApi } from '../../../lib/api/service';
interface SlideData {
  id: string;
  image: string|null;
  title: string;
  backgroundImage:File | null;
  description: string;
  iconsFile:File|null;
  icons:string|null;
  isActive: boolean;
  status: 'new' | 'existing'; // Add status
}

export function ServicesEditor() {
  const [slides, setSlides] = useState<SlideData[]>([]);

  // Load data on mount
  useEffect(() => {
    const fetchSlides = async () => {
      const response = await serviceApi.getAll();
      if (response.isSuccess && response.services?.items) {
        setSlides(
          response.services.items.map(item => ({
            id: item.id,
            title: item.title,
            isActive: item.isActive,
            status: 'existing',
            backgroundImage : null,
            image : item.imageUrl,
            icons : item.iconUrl,
            iconsFile : null,
            description : item.description
          }))
        );
      } else {
        console.error('Failed to fetch slides:', response.errors,response);
      }
    };
    fetchSlides();
  }, []);

  const addSlide = () => {
    const newSlide: SlideData = {
      id: Date.now().toString(),
      image: '',
      title: '',
      description: '',
     icons : '',
     iconsFile : null,
      isActive: true,
      status: 'new',
      backgroundImage : null
    };
    setSlides([...slides, newSlide]);
  };

  const removeSlide = async (id: string) => {
    
    const response = await serviceApi.delete(id);
    if(response.isSuccess){
      setSlides(slides.filter(slide => slide.id !== id));
    }
  };

  const updateSlide = (id: string, field: keyof SlideData, value: string | boolean | File) => {
    setSlides(slides.map(slide =>
      slide.id === id ? { ...slide, [field]: value } : slide
    ));
  };

  const saveChanges = async () => {
    for (const slide of slides) {
      const formData = new FormData();
    
      formData.append('Id', slide.id);
      formData.append('Title', slide.title);
      formData.append('Description', slide.description);

    
      if (slide.backgroundImage !== null) {
        formData.append('Images', slide.backgroundImage);
      }
    
      if (slide.iconsFile !== null) {
        formData.append('Icons', slide.iconsFile);
      }
    
      formData.append('IsActive', slide.isActive.toString());
    
      if (slide.status === 'new') {
        await serviceApi.create(formData);
      } else {
        await serviceApi.update(formData);
      }
    }
    
    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Services Slides</h2>
        <button
          onClick={addSlide}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="w-4 h-4" />
          Add Slide
        </button>
      </div>

      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-gray-50 p-4 rounded-lg relative">
            <button
              onClick={() => removeSlide(slide.id)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="grid gap-4">
  {/* Image */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
    {slide.image && (
      <div className="mb-2">
        <img
          src={'http://35.180.224.195:2712/'+slide.image}
          alt="Slide"
          style={{ width: '450px', height: '250px' }}
          className="w-full h-auto rounded-lg border"
        />
      </div>
    )}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
         updateSlide(slide.id, 'backgroundImage', file);
        }
      }}
      className="w-full p-2 border rounded-lg"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Icons</label>
    {slide.icons && (
      <div className="mb-2">
        <img
          src={'http://35.180.224.195:2712/'+slide.icons}
          alt="Slide"
          style={{ width: '450px', height: '250px' }}
          className="w-full h-auto rounded-lg border"
        />
      </div>
    )}
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
         updateSlide(slide.id, 'iconsFile', file);
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
      value={slide.title}
      onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide title"
    />
  </div>
{/* Description */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
    <input
      type="text"
      value={slide.description}
      onChange={(e) => updateSlide(slide.id, 'description', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide Description"
    />
  </div>


  {/* Is Active */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Is Active</label>
    <input
      type="checkbox"
      checked={slide.isActive}
      onChange={(e) => updateSlide(slide.id, 'isActive', e.target.checked)}
      className="mr-2"
    />
    <span>{slide.isActive ? 'Active' : 'Inactive'}</span>
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
