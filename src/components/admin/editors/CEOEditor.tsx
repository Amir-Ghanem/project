import { useState, useEffect } from 'react';
import { ceoApi } from '../../../lib/api/ceo';
import { CEOSection } from '../../../lib/types/ceo';

interface CEOData {
    id: string | null;
    title: string;
    image: string;
    description: string;
    name: string;
    position : string;
    pageIdentifier : string;
    imageFile:File | null;
  status: 'new' | 'existing';
}

export function CEOEditor() {
  const [ceos, setCEOs] = useState<CEOData[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  useEffect(() => {
    const fetchCEOs = async () => {
      try {
        const response = await ceoApi.getById(currentId);
        const ceoSection: CEOSection = response.ceo;

        if(response.isSuccess && !response.ceo){
            setCEOs([
                {
                    id: null,
                    title: '',
                    image: '',
                    description: '',
                    name: '',
                    position : '',
                    pageIdentifier : '',
                    imageFile : null,
                    status: 'new',
                  },
              ]
               
              );
        }
        if (response.isSuccess && response.ceo) {
          setCEOs([
            {
                id: ceoSection.id,
                title: ceoSection.title,
                image: ceoSection.image,
                description: ceoSection.describtion,
                name: ceoSection.name,
                position : ceoSection.position,
                pageIdentifier : ceoSection.pageIdentifier,
                imageFile : null,
                status: 'existing',
              },
          ]
           
          );
          setCurrentId(ceoSection.id);
        } else {
          console.error('Failed to fetch footers:', response.errors);
        }
      } catch (error) {
        console.error('Error fetching footers:', error);
      }
    };

    fetchCEOs();
  }, []);
 
//   const addFooter = () => {
//     const newFooter: FooterData = {
//       id: Date.now().toString(),
//       content: '',
//       links: [],
//       status: 'new',
//     };
//     setFooters([...footers, newFooter]);
//   };

//   const removeFooter = (id: string) => {
//     setFooters(footers.filter((footer) => footer.id !== id));
//   };

  const updateCEO = (id: string|null, field: keyof CEOData, value: any) => {
    setCEOs(
      ceos.map((ceo) =>
        ceo.id === id ? { ...ceo, [field]: value } : ceo
      )
    );
  };

  const saveChanges = async () => {
    for (const ceo of ceos) {
      const formData = new FormData();
      if(ceo.id !== null){
        formData.append('Id', ceo.id);
      }
      formData.append('Title', ceo.title);
      if(ceo.imageFile !== null){
        formData.append('Image', ceo.imageFile);
      }
      
      formData.append('Describtion', ceo.description);
      formData.append('Position', ceo.position);
      formData.append('pageIdentifier', ceo.pageIdentifier);
      formData.append('Name', ceo.name);
    //   footer.links.forEach((link, index) => {
    //     formData.append(`Links[${index}].Label`, link.label);
    //     formData.append(`Links[${index}].Url`, link.url);
    //   });

      try {
      
         await ceoApi.update(formData);
      } catch (error) {
        console.error('Error saving ceo:', error);
      }
    }

    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
    

      <div className="space-y-4">
        {ceos.map((ceo) => (
          <div key={ceo.id} className="bg-gray-50 p-4 rounded-lg relative">
       

            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <textarea
                  value={ceo.title}
                  onChange={(e) => updateCEO(ceo.id, 'title', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter CEO Title"
                />
              </div>

                {/* Image */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                {ceo.image && (
                  <div className="mb-2">
                    <img
                      src={`http://35.180.224.195:2711/${ceo.image}`}
                      alt="Blog"
                      className="w-full h-auto rounded-lg border"
                      style={{width:'250px',height:'400px'}}
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateCEO(ceo.id, 'imageFile', file);
                    }
                  }}
                  className="w-full p-2 border rounded-lg"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={ceo.description}
                  onChange={(e) => updateCEO(ceo.id, 'description', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <textarea
                  value={ceo.name}
                  onChange={(e) => updateCEO(ceo.id, 'name', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter CEO Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <textarea
                  value={ceo.position}
                  onChange={(e) => updateCEO(ceo.id, 'position', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter CEO Position"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PageIdentifier</label>
                <textarea
                  value={ceo.pageIdentifier}
                  onChange={(e) => updateCEO(ceo.id, 'pageIdentifier', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter PageIdentifier"
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
