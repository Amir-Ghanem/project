import api from './axios';
import { Service, ApiResponse } from '../types/service';

export const serviceApi = {
  getAll: async (pageNumber = 1, pageSize = 10, isActive = true) => {
    const response = await api.get<ApiResponse<Service>>(`/api/Services/GetAll`, {
      params: { IsActive: isActive, PageNumber: pageNumber, PageSize: pageSize }
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Service>>(`/api/Services/Get/${id}`);
    return response.data;
  },

  create: async (data: FormData) => {
    const response = await api.post<ApiResponse<void>>('/api/Services/Create', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  update: async (data: FormData) => {
    const response = await api.put<ApiResponse<void>>('/api/Services/Update', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/api/Services/Delete/${id}`);
    return response.data;
  }
};