import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { projectApi } from '../../../lib/api/project';
interface SlideData {
  id: string;
    title: string;
    description: string;
    clientName: string;
    location: string;
    completionDate: string; // ISO 8601 date string
    category: string;
    scopeOfWork: string;
    isActive: boolean;
    projectImagesURLs: string[];
    projectImagesFiles : FileList|null;
  status: 'new' | 'existing'; // Add status
}

export function ProjectsEditor() {
  const [slides, setSlides] = useState<SlideData[]>([]);

  // Load data on mount
  useEffect(() => {
    const fetchSlides = async () => {
      const response = await projectApi.getAll();
      if (response.isSuccess && response.projects?.items) {
        setSlides(
          response.projects.items.map(item => ({
            id: item.id,
            title: item.title,
            isActive: item.isActive,
            status: 'existing',
            description : item.description,
            projectImagesFiles :null ,
            projectImagesURLs:item.projectImages,
            clientName :item.clientName,
            category : item.category,
            location :item.location,
            completionDate : item.completionDate,
            scopeOfWork : item.scopeOfWork,
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
     
            title: '',
            isActive: true,
            status: 'new',
            description : '',
            projectImagesFiles : null,
            projectImagesURLs:[],
            clientName :'',
            category : '',
            location :'',
            completionDate : '',
            scopeOfWork : '',
    };
    setSlides([...slides, newSlide]);
  };

  const removeSlide = async (id: string) => {
    
    const response = await projectApi.delete(id);
    if(response.isSuccess){
      setSlides(slides.filter(slide => slide.id !== id));
    }
  };

  const updateSlide = (id: string, field: keyof SlideData, value: string | boolean | FileList) => {
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

    
      if (slide.clientName !== null) {
        formData.append('ClientName', slide.clientName);
      }
    
      if (slide.location !== null) {
        formData.append('Location', slide.location);
      }
      if (slide.completionDate !== null) {
        formData.append('CompletionDate', slide.completionDate);
      }
      if (slide.scopeOfWork !== null) {
        formData.append('ScopeOfWork', slide.scopeOfWork);
      }
      if (slide.category !== null) {
        formData.append('ProjectCategory', slide.category);
      }
      if (slide.projectImagesFiles !== null) {
        Array.from(slide.projectImagesFiles).forEach((file, index) => {
          formData.append(`Images`, file);
        });
      }
    
      formData.append('IsActive', slide.isActive.toString());
    
      if (slide.status === 'new') {
        await projectApi.create(formData);
      } else {
        await projectApi.update(formData);
      }
    }
    
    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects Slides</h2>
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
    {slide.projectImagesURLs && slide.projectImagesURLs.length > 0 && (
  <div className="mb-2 grid grid-cols-2 gap-4">
    {slide.projectImagesURLs.map((url, index) => (
      <div key={index} className="relative">
        <img
          src={`http://35.180.224.195:2711/${url}`}
          alt={`Slide ${index + 1}`}
          style={{ width: '150px', height: '100px' }}
          className="w-full h-auto rounded-lg border"
        />
        {/* <button
          onClick={() => removeImage(index)} // You can define this function to handle image removal
          className="absolute top-2 right-2 p-1 bg-white hover:bg-gray-200 rounded-full"
        >
          <X className="w-4 h-4 text-red-500" />
        </button> */}
      </div>
    ))}
  </div>
)}

    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => {
        const file = e.target.files;
        if (file) {
         updateSlide(slide.id, 'projectImagesFiles', file);
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

{/* ClientName */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
    <input
      type="text"
      value={slide.clientName}
      onChange={(e) => updateSlide(slide.id, 'clientName', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide clientName"
    />
  </div>

  {/* Location */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
    <input
      type="text"
      value={slide.location}
      onChange={(e) => updateSlide(slide.id, 'location', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide Location"
    />
  </div>

  {/* Completion Date */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
    <input
      type="date"
      value={slide.completionDate}
      onChange={(e) => updateSlide(slide.id, 'completionDate', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide Completion Date"
    />
  </div>

  {/* Scope of Work */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Scope of Work</label>
    <input
      type="text"
      value={slide.scopeOfWork}
      onChange={(e) => updateSlide(slide.id, 'scopeOfWork', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide Scope of Work"
    />
  </div>

  {/* Category */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
    <input
      type="text"
      value={slide.category}
      onChange={(e) => updateSlide(slide.id, 'category', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide Category"
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
