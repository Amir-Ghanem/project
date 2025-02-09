import { useState, useEffect } from 'react';
import { footerApi } from '../../../lib/api/footer';
import { FooterSection } from '../../../lib/types/footer';

interface FooterData {
    id: string;
    companyDescription: string;
    logoUrl: string;
    copyrightText: string;
    buttonText: string;
    logo : File|null;
  status: 'new' | 'existing';
}

export function FooterEditor() {
  const [footers, setFooters] = useState<FooterData[]>([]);

  useEffect(() => {
    const fetchFooters = async () => {
      try {
        const response = await footerApi.getById('');
        const footerSection: FooterSection = response.footerSection;

        if (response.isSuccess && response.footerSection) {
          setFooters([
            {
                id: footerSection.id,
               companyDescription:footerSection.companyDescription,
               logoUrl:footerSection.logoUrl,
               copyrightText : footerSection.companyDescription,
               buttonText : footerSection.buttonText,
               logo : null,
                status: 'existing',
              },
          ]
           
          );
        } else {
          console.error('Failed to fetch footers:', response.errors);
        }
      } catch (error) {
        console.error('Error fetching footers:', error);
      }
    };

    fetchFooters();
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

  const updateFooter = (id: string, field: keyof FooterData, value: any) => {
    setFooters(
      footers.map((footer) =>
        footer.id === id ? { ...footer, [field]: value } : footer
      )
    );
  };

  const saveChanges = async () => {
    for (const footer of footers) {
      const formData = new FormData();
      formData.append('Id', footer.id);
      formData.append('CompanyDescription', footer.companyDescription);
      if(footer.logo !== null){
        formData.append('Logo', footer.logo);
      }
      
      formData.append('CopyrightText', footer.copyrightText);
      formData.append('ButtonText', '');
    //   footer.links.forEach((link, index) => {
    //     formData.append(`Links[${index}].Label`, link.label);
    //     formData.append(`Links[${index}].Url`, link.url);
    //   });

      try {
        // await fetch('http://35.180.224.195:2711/api/FooterSection/Update', {
        //   method: 'POST',
        //   body: formData,
        // });
         await footerApi.update(formData);
      } catch (error) {
        console.error('Error saving footer:', error);
      }
    }

    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Footer Sections</h2>
        <button
          onClick={addFooter}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="w-4 h-4" />
          Add Footer
        </button>
      </div> */}

      <div className="space-y-4">
        {footers.map((footer) => (
          <div key={footer.id} className="bg-gray-50 p-4 rounded-lg relative">
            {/* <button
              onClick={() => removeFooter(footer.id)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button> */}

            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                <textarea
                  value={footer.companyDescription}
                  onChange={(e) => updateFooter(footer.id, 'companyDescription', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter footer Company Description"
                />
              </div>

                {/* Image */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                {footer.logoUrl && (
                  <div className="mb-2">
                    <img
                      src={`http://35.180.224.195:2711/${footer.logoUrl}`}
                      alt="Blog"
                      className="w-full h-auto rounded-lg border"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateFooter(footer.id, 'logo', file);
                    }
                  }}
                  className="w-full p-2 border rounded-lg"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Copy Rights</label>
                <textarea
                  value={footer.copyrightText}
                  onChange={(e) => updateFooter(footer.id, 'copyrightText', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter footer Copyrights"
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Links</label>
                {footer.links.map((link, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...footer.links];
                        newLinks[index].label = e.target.value;
                        updateFooter(footer.id, 'links', newLinks);
                      }}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...footer.links];
                        newLinks[index].url = e.target.value;
                        updateFooter(footer.id, 'links', newLinks);
                      }}
                      className="w-full p-2 border rounded-lg"
                      placeholder="URL"
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newLinks = [...footer.links, { label: '', url: '' }];
                    updateFooter(footer.id, 'links', newLinks);
                  }}
                  className="text-teal-500 hover:underline"
                >
                  + Add Link
                </button>
              </div> */}
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
