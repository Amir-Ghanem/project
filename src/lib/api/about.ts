import api from './axios';
import { AboutSection, ApiResponse } from '../types/about';

export const aboutApi = {
  getAll: async (pageNumber = 1, pageSize = 10, isActive = true) => {
    const response = await api.get<ApiResponse<AboutSection>>(`/api/AboutSections/GetAll`, {
      params: { IsActive: isActive, PageNumber: pageNumber, PageSize: pageSize }
    });
    return response.data;
  },

  getById: async (pageIdentifier: string) => {
    const response = await api.get<ApiResponse<AboutSection>>(`/api/AboutSections/Get/${pageIdentifier}`);
    return response.data;
  },
  update: async (data: FormData) => {
    const response = await api.put<ApiResponse<void>>('/api/AboutSections/Update', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/api/AboutSections/Delete/${id}`);
    return response.data;
  }
};