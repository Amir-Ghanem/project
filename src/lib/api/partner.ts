import api from './axios';
import { ApiResponse, Partner } from '../types/partner';

export const partnersApi = {
  getAll: async (pageNumber = 1, pageSize = 10, isActive = true) => {
    const response = await api.get<ApiResponse<Partner>>(`/api/Partners/GetAll`, {
      params: { IsActive: isActive, PageNumber: pageNumber, PageSize: pageSize }
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Partner>>(`/api/Partners/Get/${id}`);
    return response.data;
  },

  create: async (data: FormData) => {
    const response = await api.post<ApiResponse<void>>('/api/Partners/Create', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  update: async (data: FormData) => {
    const response = await api.put<ApiResponse<void>>('/api/Partners/Update', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/api/Partners/Delete/${id}`);
    return response.data;
  }
};