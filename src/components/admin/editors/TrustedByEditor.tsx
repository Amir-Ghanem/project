import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { partnersApi } from '../../../lib/api/partner';

interface PartnerData {
  id: string;
  name: string;
  websiteUrl: string;
  partnerType: string;
  image: string | null;
  imageFile: File | null;
  latitude: number;
  longitude: number;
  isActive: boolean;
  displayOrder: number;
  status: 'new' | 'existing';
}

export function TrustedByEditor() {
  const [partners, setPartners] = useState<PartnerData[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const response = await partnersApi.getAll();
      if (response.isSuccess && response.partners?.items) {
        setPartners(
          response.partners.items.map((item: any) => ({
            id: item.id,
            name: item.name,
            websiteUrl: item.websiteUrl,
            partnerType: item.partnerType,
            image: item.image,
            imageFile: null,
            latitude: item.latitude,
            longitude: item.longitude,
            isActive: item.isActive,
            displayOrder: item.displayOrder,
            status: 'existing',
          }))
        );
      } else {
        console.error('Failed to fetch partners:', response.errors, response);
      }
    };
    fetchPartners();
  }, []);

  const addPartner = () => {
    const newPartner: PartnerData = {
      id: Date.now().toString(),
      name: '',
      websiteUrl: '',
      partnerType: 'Partner',
      image: null,
      imageFile: null,
      latitude: 0,
      longitude: 0,
      isActive: true,
      displayOrder: partners.length + 1,
      status: 'new',
    };
    setPartners([...partners, newPartner]);
  };

  const removePartner = async (id: string) => {
    const response = await partnersApi.delete(id);
    if (response.isSuccess) {
      setPartners(partners.filter((partner) => partner.id !== id));
    }
  };

  const updatePartner = (id: string, field: keyof PartnerData, value: any) => {
    setPartners(
      partners.map((partner) =>
        partner.id === id ? { ...partner, [field]: value } : partner
      )
    );
  };

  const saveChanges = async () => {
    for (const partner of partners) {
      const formData = new FormData();
      formData.append('Id', partner.id);
      formData.append('Name', partner.name);
      formData.append('WebsiteUrl', partner.websiteUrl);
      formData.append('PartnerType', partner.partnerType);
      formData.append('Latitude', partner.latitude.toString());
      formData.append('Longitude', partner.longitude.toString());
      formData.append('IsActive', partner.isActive.toString());
      formData.append('DisplayOrder', partner.displayOrder.toString());

      if (partner.imageFile !== null) {
        formData.append('Image', partner.imageFile);
      }

      if (partner.status === 'new') {
        await partnersApi.create(formData);
      } else {
        await partnersApi.update(formData);
      }
    }
    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Trusted By Editor</h2>
        <button
          onClick={addPartner}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="w-4 h-4" />
          Add Partner
        </button>
      </div>

      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-gray-50 p-4 rounded-lg relative">
            <button
              onClick={() => removePartner(partner.id)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={partner.name}
                  onChange={(e) => updatePartner(partner.id, 'name', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter partner name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input
                  type="url"
                  value={partner.websiteUrl}
                  onChange={(e) => updatePartner(partner.id, 'websiteUrl', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter website URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Type</label>
                <input
                  type="url"
                  value={partner.partnerType}
                  onChange={(e) => updatePartner(partner.id, 'partnerType', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter Partner Type"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                {partner.image && (
                  <img
                    src={`http://35.180.224.195:2711/${partner.image}`}
                    alt="Partner"
                    style={{ width: '450px', height: '250px' }}
                    className="w-full h-auto rounded-lg border mb-2"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updatePartner(partner.id, 'imageFile', file);
                    }
                  }}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Is Active</label>
                <input
                  type="checkbox"
                  checked={partner.isActive}
                  onChange={(e) => updatePartner(partner.id, 'isActive', e.target.checked)}
                  className="mr-2"
                />
                <span>{partner.isActive ? 'Active' : 'Inactive'}</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={partner.displayOrder}
                  onChange={(e) => updatePartner(partner.id, 'displayOrder', parseInt(e.target.value, 10))}
                  className="w-full p-2 border rounded-lg"
                  min="1"
                />
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
