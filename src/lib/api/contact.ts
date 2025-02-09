import { ApiResponse, ContactSection , Request } from '../types/contact';
import api from './axios';

export const contactApi = {
  // Contact Section APIs
  getContactSection: async (pageIdentifier:string) => {
    const response = await api.get<ApiResponse<ContactSection>>(`/api/ContactSections/Get?pageIdentifier=${pageIdentifier}`);
    return response.data;
  },

  updateContactSection: async (data: FormData) => {
    const response = await api.put<ApiResponse<void>>('/api/ContactSections/Update', data);
    return response.data;
  },

  // Contact Request APIs
  submitRequest: async (data: FormData) => {
    const response = await api.post<ApiResponse<void>>('/api/Request/Create', data);
    return response.data;
  },

  getAllRequests: async (pageNumber = 1, pageSize = 10) => {
    const response = await api.get<ApiResponse<Request>>('/api/Request/GetAll', {
      params: { PageNumber: pageNumber, PageSize: pageSize }
    });
    return response.data;
  },

  getRequestById: async (id: string) => {
    const response = await api.get<ApiResponse<Request>>(`/api/Request/Get/${id}`);
    return response.data;
  },

  markRequestAsRead: async (id: string) => {
    const response = await api.put<ApiResponse<void>>(`/api/Request/MarkAsRead/${id}`);
    return response.data;
  },

  deleteRequest: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/api/Request/Delete/${id}`);
    return response.data;
  }
};