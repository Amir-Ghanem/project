import { X } from 'lucide-react';
import { Service } from '../../../../lib/types/service';

interface ServiceDetailsProps {
  service: Service;
  onClose: () => void;
}

export function ServiceDetails({ service, onClose }: ServiceDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Service Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {service.image && (
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          <div className="grid gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Title</h3>
              <p className="mt-1">{service.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1">{service.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Icon</h3>
              <p className="mt-1">{service.icon}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1">{service.isActive ? 'Active' : 'Inactive'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}