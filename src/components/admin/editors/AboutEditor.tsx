import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { aboutApi } from '../../../lib/api/about';
interface SlideData {
  id: string|null;
  title: string;
  content: string;
  imageUrl: string;
  secondImageUrl: string;
  imageFile: File|null;
  secondImageFile: File | null;
  buttonText: string;
  buttonUrl: string;
  isActive: boolean;
  aboutList: string[];
  aboutListString: string;
  noOfYearsExp: string;
  noOfYearsExpLabel: string;
  pageIdentifier: "Home" | string; 
  status: 'new' | 'existing'; // Add status
}

export function AboutEditor() {
  const [slides, setSlides] = useState<SlideData[]>([]);

  // Load data on mount
  useEffect(() => {
    const fetchSlides = async () => {
      const response = await aboutApi.getAll();
      if (response.isSuccess && response.aboutSections?.items) {
        setSlides(
          response.aboutSections.items.map(item => ({
            id: item.id,
            title: item.title,
            isActive: item.isActive,
            status: 'existing',
            content : item.content,
            imageUrl : item.imageUrl,
            secondImageUrl : item.secondImageUrl,
            imageFile : null,
            secondImageFile : null,
            buttonText:item.buttonText,
            buttonUrl: item.buttonUrl,
            aboutList : item.aboutList,
            aboutListString : item.aboutListString,
            noOfYearsExp : item.noOfYearsExp,
            noOfYearsExpLabel : item.noOfYearsExpLabel,
            pageIdentifier : item.pageIdentifier
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
      id: null,
     
 
      title: '',
      isActive: true,
      status: 'existing',
      content : '',
      imageUrl : '',
      secondImageUrl : '',
      imageFile : null,
      secondImageFile : null,
      buttonText:'',
      buttonUrl: '',
      aboutList : [],
      aboutListString : '',
      noOfYearsExp : '',
      noOfYearsExpLabel : '',
      pageIdentifier : ''
    };
    setSlides([...slides, newSlide]);
  };

  const removeSlide = async (id: string) => {
    
    const response = await aboutApi.delete(id);
    if(response.isSuccess){
      setSlides(slides.filter(slide => slide.id !== id));
    }
  };

  const updateSlide = (id: string|null, field: keyof SlideData, value: string | boolean | File) => {
    setSlides(slides.map(slide =>
      slide.id === id ? { ...slide, [field]: value } : slide
    ));
  };

  const saveChanges = async () => {
    for (const slide of slides) {
      const formData = new FormData();
    
      if(slide.id !== null){
        formData.append('Id', slide.id);
      }
      
      formData.append('Title', slide.title);
      formData.append('Content', slide.content);

    
      if (slide.imageFile !== null) {
        formData.append('ImageUrl', slide.imageFile);
      }
    
      if (slide.secondImageFile !== null) {
        formData.append('SecondImageUrl', slide.secondImageFile);
      }
      if (slide.aboutList !== null) {
        Array.from(slide.aboutList).forEach((x, index) => {
          formData.append(`AboutList[${index}]`, x);
        });
      }
      if (slide.noOfYearsExp !== null) {
        formData.append('NoOfYearsExp', slide.noOfYearsExp);
      }
      if (slide.noOfYearsExpLabel !== null) {
        formData.append('NoOfYearsExpLabel', slide.noOfYearsExpLabel);
      }
      if (slide.buttonText !== null) {
        formData.append('ButtonText', slide.buttonText);
      }
      
      if (slide.buttonUrl !== null) {
        formData.append('ButtonUrl', slide.buttonUrl);
      }
    
      formData.append('IsActive', slide.isActive.toString());
      formData.append('PageIdentifier', slide.pageIdentifier);
    
    //   if (slide.status === 'new') {
    //     await aboutApi.create(formData);
    //   } else {
        await aboutApi.update(formData);
    //   }
    }
    
    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">AboutUs Slides</h2>
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
              onClick={() => removeSlide(slide.id??'')}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="grid gap-4">
  {/* Image */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
    {slide.imageUrl && (
      <div className="mb-2">
        <img
          src={'http://35.180.224.195:2712/'+slide.imageUrl}
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
         updateSlide(slide.id??'', 'imageFile', file);
        }
      }}
      className="w-full p-2 border rounded-lg"
    />
  </div>
   {/* second Image */}
   <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
    {slide.secondImageUrl && (
      <div className="mb-2">
        <img
          src={'http://35.180.224.195:2712/'+slide.secondImageUrl}
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
         updateSlide(slide.id, 'secondImageFile', file);
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
{/* Content */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
    <input
      type="text"
      value={slide.content}
      onChange={(e) => updateSlide(slide.id, 'content', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide Content"
    />
  </div>

{/* NoOfYearsExp */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">No Of Years Exp</label>
    <input
      type="text"
      value={slide.noOfYearsExp}
      onChange={(e) => updateSlide(slide.id, 'noOfYearsExp', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide No Of Years Exp"
    />
  </div>

  {/* NoOfYearsExpLabel */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">No Of Years Exp Label</label>
    <input
      type="text"
      value={slide.noOfYearsExpLabel}
      onChange={(e) => updateSlide(slide.id, 'noOfYearsExpLabel', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide No Of Years Exp Label"
    />
  </div>

  {/* ButtonText */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
    <input
      type="text"
      value={slide.buttonText}
      onChange={(e) => updateSlide(slide.id, 'buttonText', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide ButtonText"
    />
  </div>

  {/* ButtonUrl */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Button Url</label>
    <input
      type="text"
      value={slide.buttonUrl}
      onChange={(e) => updateSlide(slide.id, 'buttonUrl', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide Button Url"
    />
  </div>

  {/* PageIdentifier */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Page Identifier</label>
    <input
      type="text"
      value={slide.pageIdentifier}
      onChange={(e) => updateSlide(slide.id, 'pageIdentifier', e.target.value)}
      className="w-full p-2 border rounded-lg"
      placeholder="Enter slide Page Identifier"
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
