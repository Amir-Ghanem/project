import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Service } from '../../../../lib/types/service';

interface ServiceTableProps {
  services: Service[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export function ServiceTable({ services, onEdit, onDelete, onView }: ServiceTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">{service.title}</td>
              <td className="px-4 py-3">{service.description}</td>
              <td className="px-4 py-3 text-center">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onView(service.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(service.id)}
                    className="p-2 text-amber-600 hover:bg-amber-50 rounded-full"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(service.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}