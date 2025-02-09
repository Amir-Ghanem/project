import { useState, useEffect } from 'react';
import { contactApi } from '../../../lib/api/contact';
import { ContactSection } from '../../../lib/types/contact';

interface ContactData {
    id: string | null;
    title: string | null;
    subtitle: string | null;
    showMap: boolean;
    latitude: number;
    longitude: number;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    isActive: boolean;
    pageIdentifier: string;
    status: 'new' | 'existing';
}

export function ContactEditor() {
    console.log("welcome from Contacts");
  const [contacts, setContacts] = useState<ContactData[]>([]);
//   const [currentPageIdentifier, setCurrentPageIdentifier] = useState<string>('');

  useEffect(() => {
    const fetchContactSection = async () => {
      try {
        console.log("welcome from fetchContactSection");
        const response = await contactApi.getContactSection('Contacts');
        const contactSection: ContactSection | undefined = response.contactSection;
        console.log(response);
        if(response.isSuccess){
            if(!contactSection){
                setContacts([
                    {
                      id: null,
                      title: null,
                      subtitle: null,
                      showMap: false,
                      latitude: 0,
                      longitude: 0,
                      emailLabel: '',
                      phoneLabel: '',
                      addressLabel: '',
                      isActive: true,
                      pageIdentifier: "Contacts",
                      status: 'new',
                    },
                  ]);
            }
            else{
                setContacts([
                    {
                      id: contactSection.id,
                      title: contactSection.title,
                      subtitle: contactSection.subtitle,
                      showMap: contactSection.showMap,
                      latitude: contactSection.latitude,
                      longitude: contactSection.longitude,
                      emailLabel: contactSection.emailLabel,
                      phoneLabel: contactSection.phoneLabel,
                      addressLabel: contactSection.addressLabel,
                      isActive: contactSection.isActive,
                      pageIdentifier: contactSection.pageIdentifier,
                      status: 'existing',
                    },
                  ]);
            }
          
        }
      } catch (error) {
        console.error('Error fetching contact section:', error);
      }
    };
    fetchContactSection();
    // if (currentPageIdentifier) {
    //   fetchContactSection();
    // }
  }, []);

  const updateContact = (id: string | null, field: keyof ContactData, value: any) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  const saveChanges = async () => {
    for (const contact of contacts) {
      const formData = new FormData();
      if (contact.id !== null) {
        formData.append('Id', contact.id);
      }
      formData.append('Title', contact.title ?? '');
      formData.append('Subtitle', contact.subtitle ?? '');
      formData.append('ShowMap', String(contact.showMap));
      formData.append('Latitude', String(contact.latitude));
      formData.append('Longitude', String(contact.longitude));
      formData.append('EmailLabel', contact.emailLabel);
      formData.append('PhoneLabel', contact.phoneLabel);
      formData.append('AddressLabel', contact.addressLabel);
      formData.append('IsActive', String(contact.isActive));
      formData.append('PageIdentifier', contact.pageIdentifier);

      try {
        await contactApi.updateContactSection(formData);
      } catch (error) {
        console.error('Error saving contact section:', error);
      }
    }

    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-gray-50 p-4 rounded-lg relative">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <textarea
                  value={contact.title ?? ''}
                  onChange={(e) => updateContact(contact.id, 'title', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <textarea
                  value={contact.subtitle ?? ''}
                  onChange={(e) => updateContact(contact.id, 'subtitle', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Show Map</label>
                <input
                  type="checkbox"
                  checked={contact.showMap}
                  onChange={(e) => updateContact(contact.id, 'showMap', e.target.checked)}
                  className="h-4 w-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                <input
                  type="number"
                  value={contact.latitude}
                  onChange={(e) => updateContact(contact.id, 'latitude', parseFloat(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Latitude"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                <input
                  type="number"
                  value={contact.longitude}
                  onChange={(e) => updateContact(contact.id, 'longitude', parseFloat(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Longitude"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Label</label>
                <textarea
                  value={contact.emailLabel}
                  onChange={(e) => updateContact(contact.id, 'emailLabel', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Email Label"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Label</label>
                <textarea
                  value={contact.phoneLabel}
                  onChange={(e) => updateContact(contact.id, 'phoneLabel', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Phone Label"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Label</label>
                <textarea
                  value={contact.addressLabel}
                  onChange={(e) => updateContact(contact.id, 'addressLabel', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Address Label"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Active</label>
                <input
                  type="checkbox"
                  checked={contact.isActive}
                  onChange={(e) => updateContact(contact.id, 'isActive', e.target.checked)}
                  className="h-4 w-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Identifier</label>
                <textarea
                  value={contact.pageIdentifier}
                  onChange={(e) => updateContact(contact.id, 'pageIdentifier', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Page Identifier"
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
