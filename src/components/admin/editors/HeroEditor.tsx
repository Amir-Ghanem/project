// import { useState, useEffect } from 'react';
// import { Plus, X } from 'lucide-react';
// import { heroApi } from '../../../lib/api/hero';
// interface SlideData {
//   id: string;
//   image: string|null;
//   title: string;
//   subtitle: string;
//   backgroundImage:File | null;
//   // description: string;
//   primaryButtonText: string|null;
//   secondaryButtonText: string|null;
//   primaryButtonUrl: string|null;
//   secondaryButtonUrl: string|null;
//   isActive: boolean;
//   pageIdentifier: string;
//   status: 'new' | 'existing'; // Add status
// }

// export function HeroEditor() {
//   const [slides, setSlides] = useState<SlideData[]>([]);

//   // Load data on mount
//   useEffect(() => {
//     const fetchSlides = async () => {
//       const response = await heroApi.getAll();
//       if (response.isSuccess && response.heroSections?.items) {
//         setSlides(
//           response.heroSections.items.map(item => ({
//             id: item.id,
//             title: item.title,
//             subtitle: item.subtitle,
//             image: item.backgroundImage,
//             primaryButtonText: item.primaryButtonText,
//             primaryButtonUrl: item.primaryButtonUrl,
//             secondaryButtonText: item.secondaryButtonText,
//             secondaryButtonUrl: item.secondaryButtonUrl,
//             isActive: item.isActive,
//             pageIdentifier: item.pageIdentifier,
//             status: 'existing',
//             backgroundImage : null
//           }))
//         );
//       } else {
//         console.error('Failed to fetch slides:', response.errors);
//       }
//     };
//     fetchSlides();
//   }, []);

//   const addSlide = () => {
//     const newSlide: SlideData = {
//       id: Date.now().toString(),
//       image: '',
//       title: '',
//       subtitle: '',
//       // description: '',
//       primaryButtonText: '',
//       secondaryButtonText: '',
//       primaryButtonUrl: '',
//       secondaryButtonUrl: '',
//       isActive: true,
//       pageIdentifier: '',
//       status: 'new',
//       backgroundImage : null
//     };
//     setSlides([...slides, newSlide]);
//   };

//   const removeSlide = async (id: string) => {
    
//     const response = await heroApi.delete(id);
//     if(response.isSuccess){
//       setSlides(slides.filter(slide => slide.id !== id));
//     }
//   };

//   const updateSlide = (id: string, field: keyof SlideData, value: string | boolean | File) => {
//     setSlides(slides.map(slide =>
//       slide.id === id ? { ...slide, [field]: value } : slide
//     ));
//   };

//   const saveChanges = async () => {
//     for (const slide of slides) {
//       const formData = new FormData();
    
//       formData.append('Id', slide.id);
//       formData.append('Title', slide.title);
//       formData.append('Subtitle', slide.subtitle);
    
//       if (slide.primaryButtonText !== null) {
//         formData.append('PrimaryButtonText', slide.primaryButtonText);
//       }
    
//       if (slide.backgroundImage !== null) {
//         formData.append('BackgroundImage', slide.backgroundImage);
//       }
    
//       if (slide.secondaryButtonText !== null) {
//         formData.append('SecondaryButtonText', slide.secondaryButtonText);
//       }
    
//       if (slide.primaryButtonUrl !== null) {
//         formData.append('PrimaryButtonUrl', slide.primaryButtonUrl);
//       }
    
//       if (slide.secondaryButtonUrl !== null) {
//         formData.append('SecondaryButtonUrl', slide.secondaryButtonUrl);
//       }
    
//       formData.append('IsActive', slide.isActive.toString());
//       formData.append('PageIdentifier', slide.pageIdentifier);
    
//       if (slide.status === 'new') {
//         await heroApi.create(formData);
//       } else {
//         await heroApi.update(formData);
//       }
//     }
    
//     alert('Changes saved!');
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold">Hero Slides</h2>
//         <button
//           onClick={addSlide}
//           className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
//         >
//           <Plus className="w-4 h-4" />
//           Add Slide
//         </button>
//       </div>

//       <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//         {slides.map((slide) => (
//           <div key={slide.id} className="bg-gray-50 p-4 rounded-lg relative">
//             <button
//               onClick={() => removeSlide(slide.id)}
//               className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
//             >
//               <X className="w-4 h-4" />
//             </button>
            
//             <div className="grid gap-4">
//   {/* Image */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
//     {slide.image && (
//       <div className="mb-2">
//         <img
//           src={'http://35.180.224.195:2711/'+slide.image}
//           alt="Slide"
//           style={{ width: '450px', height: '250px' }}
//           className="w-full h-auto rounded-lg border"
//         />
//       </div>
//     )}
//     <input
//       type="file"
//       accept="image/*"
//       onChange={(e) => {
//         const file = e.target.files?.[0];
//         if (file) {
//          updateSlide(slide.id, 'backgroundImage', file);
//         }
//       }}
//       className="w-full p-2 border rounded-lg"
//     />
//   </div>

//   {/* Title */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//     <input
//       type="text"
//       value={slide.title}
//       onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
//       className="w-full p-2 border rounded-lg"
//       placeholder="Enter slide title"
//     />
//   </div>

//   {/* Subtitle */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
//     <input
//       type="text"
//       value={slide.subtitle}
//       onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)}
//       className="w-full p-2 border rounded-lg"
//       placeholder="Enter slide subtitle"
//     />
//   </div>

//   {/* Primary Button Text */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button Text</label>
//     <input
//       type="text"
//       value={slide.primaryButtonText || ''}
//       onChange={(e) => updateSlide(slide.id, 'primaryButtonText', e.target.value)}
//       className="w-full p-2 border rounded-lg"
//       placeholder="Enter primary button text"
//     />
//   </div>

//   {/* Primary Button URL */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">Primary Button URL</label>
//     <input
//       type="text"
//       value={slide.primaryButtonUrl || ''}
//       onChange={(e) => updateSlide(slide.id, 'primaryButtonUrl', e.target.value)}
//       className="w-full p-2 border rounded-lg"
//       placeholder="Enter primary button URL"
//     />
//   </div>

//   {/* Secondary Button Text */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button Text</label>
//     <input
//       type="text"
//       value={slide.secondaryButtonText || ''}
//       onChange={(e) => updateSlide(slide.id, 'secondaryButtonText', e.target.value)}
//       className="w-full p-2 border rounded-lg"
//       placeholder="Enter secondary button text"
//     />
//   </div>

//   {/* Secondary Button URL */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Button URL</label>
//     <input
//       type="text"
//       value={slide.secondaryButtonUrl || ''}
//       onChange={(e) => updateSlide(slide.id, 'secondaryButtonUrl', e.target.value)}
//       className="w-full p-2 border rounded-lg"
//       placeholder="Enter secondary button URL"
//     />
//   </div>

//   {/* Is Active */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">Is Active</label>
//     <input
//       type="checkbox"
//       checked={slide.isActive}
//       onChange={(e) => updateSlide(slide.id, 'isActive', e.target.checked)}
//       className="mr-2"
//     />
//     <span>{slide.isActive ? 'Active' : 'Inactive'}</span>
//   </div>

//   {/* Page Identifier */}
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-1">Page Identifier</label>
//     <input
//       type="text"
//       value={slide.pageIdentifier}
//       onChange={(e) => updateSlide(slide.id, 'pageIdentifier', e.target.value)}
//       className="w-full p-2 border rounded-lg"
//       placeholder="Enter page identifier"
//     />
//   </div>
// </div>

//           </div>
//         ))}
//       </div>

//       <div className="flex justify-end">
//         <button
//           className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
//           onClick={saveChanges}
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from 'react';
import { Plus, X, Loader } from 'lucide-react'; // Import Loader icon
import { heroApi } from '../../../lib/api/hero';

interface SlideData {
  id: string;
  image: string | null;
  title: string;
  subtitle: string;
  backgroundImage: File | null;
  primaryButtonText: string | null;
  secondaryButtonText: string | null;
  primaryButtonUrl: string | null;
  secondaryButtonUrl: string | null;
  isActive: boolean;
  pageIdentifier: string;
  status: 'new' | 'existing';
}

export function HeroEditor() {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isSaving, setIsSaving] = useState(false); // Track saving state
  const newSlideRef = useRef<HTMLDivElement | null>(null); // Ref for scrolling to new slide

  // Load data on mount
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await heroApi.getAll();
        if (response.isSuccess && response.heroSections?.items) {
          setSlides(
            response.heroSections.items.map((item) => ({
              id: item.id,
              title: item.title,
              subtitle: item.subtitle,
              image: item.backgroundImage,
              primaryButtonText: item.primaryButtonText,
              primaryButtonUrl: item.primaryButtonUrl,
              secondaryButtonText: item.secondaryButtonText,
              secondaryButtonUrl: item.secondaryButtonUrl,
              isActive: item.isActive,
              pageIdentifier: item.pageIdentifier,
              status: 'existing',
              backgroundImage: null,
            }))
          );
        } else {
          console.error('Failed to fetch slides:', response.errors);
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    fetchSlides();
  }, []);

  const addSlide = () => {
    const newSlide: SlideData = {
      id: Date.now().toString(),
      image: '',
      title: '',
      subtitle: '',
      primaryButtonText: '',
      secondaryButtonText: '',
      primaryButtonUrl: '',
      secondaryButtonUrl: '',
      isActive: true,
      pageIdentifier: '',
      status: 'new',
      backgroundImage: null,
    };
    setSlides([...slides, newSlide]);

    // Scroll to the newly added slide after a short delay
    setTimeout(() => {
      newSlideRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const removeSlide = async (id: string) => {
    const response = await heroApi.delete(id);
    if (response.isSuccess) {
      setSlides(slides.filter((slide) => slide.id !== id));
    }
  };

  const updateSlide = (id: string, field: keyof SlideData, value: string | boolean | File) => {
    setSlides(
      slides.map((slide) =>
        slide.id === id ? { ...slide, [field]: value } : slide
      )
    );
  };

  const saveChanges = async () => {
    setIsSaving(true); // Start saving

    try {
      setIsLoading(true); // Start loading
      for (const slide of slides) {
        const formData = new FormData();
        formData.append('Id', slide.id);
        formData.append('Title', slide.title);
        formData.append('Subtitle', slide.subtitle);

        if (slide.primaryButtonText !== null) {
          formData.append('PrimaryButtonText', slide.primaryButtonText);
        }

        if (slide.backgroundImage !== null) {
          formData.append('BackgroundImage', slide.backgroundImage);
        }

        if (slide.secondaryButtonText !== null) {
          formData.append('SecondaryButtonText', slide.secondaryButtonText);
        }

        if (slide.primaryButtonUrl !== null) {
          formData.append('PrimaryButtonUrl', slide.primaryButtonUrl);
        }

        if (slide.secondaryButtonUrl !== null) {
          formData.append('SecondaryButtonUrl', slide.secondaryButtonUrl);
        }

        formData.append('IsActive', slide.isActive.toString());
        formData.append('PageIdentifier', slide.pageIdentifier);

        if (slide.status === 'new') {
          await heroApi.create(formData);
        } else {
          await heroApi.update(formData);
        }
      }
      setIsLoading(false);
      alert('Changes saved!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
      setIsLoading(false);
    } finally {
      setIsSaving(false); // Stop saving
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-teal-500" /> {/* Loading spinner */}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Hero Slides</h2>
        <button
          onClick={addSlide}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="w-4 h-4" />
          Add Slide
        </button>
      </div>

      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={index === slides.length - 1 ? newSlideRef : null} // Attach ref to the last slide
            className="bg-gray-50 p-4 rounded-lg relative"
          >
            <button
              onClick={() => removeSlide(slide.id)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid gap-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                {slide.image && (
                  <div className="mb-2">
                    <img
                      src={'http://35.180.224.195:2711/' + slide.image}
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

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={slide.title}
                  onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter slide title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={slide.subtitle}
                  onChange={(e) => updateSlide(slide.id, 'subtitle', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter slide subtitle"
                />
              </div>

              {/* Primary Button Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={slide.primaryButtonText || ''}
                  onChange={(e) =>
                    updateSlide(slide.id, 'primaryButtonText', e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter primary button text"
                />
              </div>

              {/* Primary Button URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Button URL
                </label>
                <input
                  type="text"
                  value={slide.primaryButtonUrl || ''}
                  onChange={(e) =>
                    updateSlide(slide.id, 'primaryButtonUrl', e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter primary button URL"
                />
              </div>

              {/* Secondary Button Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={slide.secondaryButtonText || ''}
                  onChange={(e) =>
                    updateSlide(slide.id, 'secondaryButtonText', e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter secondary button text"
                />
              </div>

              {/* Secondary Button URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Button URL
                </label>
                <input
                  type="text"
                  value={slide.secondaryButtonUrl || ''}
                  onChange={(e) =>
                    updateSlide(slide.id, 'secondaryButtonUrl', e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter secondary button URL"
                />
              </div>

              {/* Is Active */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Is Active
                </label>
                <input
                  type="checkbox"
                  checked={slide.isActive}
                  onChange={(e) =>
                    updateSlide(slide.id, 'isActive', e.target.checked)
                  }
                  className="mr-2"
                />
                <span>{slide.isActive ? 'Active' : 'Inactive'}</span>
              </div>

              {/* Page Identifier */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Identifier
                </label>
                <input
                  type="text"
                  value={slide.pageIdentifier}
                  onChange={(e) =>
                    updateSlide(slide.id, 'pageIdentifier', e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter page identifier"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 flex items-center gap-2"
          onClick={saveChanges}
          disabled={isSaving} // Disable button while saving
        >
          {isSaving ? (
            <>
              <Loader className="w-4 h-4 animate-spin" /> {/* Saving spinner */}
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </div>
  );
}