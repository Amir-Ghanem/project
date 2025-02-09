import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { ServiceTable } from './ServiceTable';
import { ServiceForm } from './ServiceForm';
import { ServiceDetails } from './ServiceDetails';
import { serviceApi } from '../../../../lib/api/service';
import { Service } from '../../../../lib/types/service';
import { toast } from 'react-hot-toast';

export function ServiceEditor() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await serviceApi.getAll();
      if (response.services?.items) {
        setServices(response.services.items);
      }
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async (data: FormData) => {
    try {
      await serviceApi.create(data);
      toast.success('Service created successfully');
      fetchServices();
      setIsFormOpen(false);
    } catch (error) {
      toast.error('Failed to create service');
    }
  };

  const handleUpdate = async (data: FormData) => {
    try {
      await serviceApi.update(data);
      toast.success('Service updated successfully');
      fetchServices();
      setIsFormOpen(false);
      setSelectedService(null);
    } catch (error) {
      toast.error('Failed to update service');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await serviceApi.delete(id);
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await serviceApi.getById(id);
      if (response.service) {
        setSelectedService(response.service);
        setIsFormOpen(true);
      }
    } catch (error) {
      toast.error('Failed to fetch service details');
    }
  };

  const handleView = async (id: string) => {
    try {
      const response = await serviceApi.getById(id);
      if (response.service) {
        setSelectedService(response.service);
        setIsDetailsOpen(true);
      }
    } catch (error) {
      toast.error('Failed to fetch service details');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Services</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      <ServiceTable
        services={services}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />

      {isFormOpen && (
        <ServiceForm
          service={selectedService || undefined}
          onSubmit={selectedService ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedService(null);
          }}
        />
      )}

      {isDetailsOpen && selectedService && (
        <ServiceDetails
          service={selectedService}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedService(null);
          }}
        />
      )}
    </div>
  );
}