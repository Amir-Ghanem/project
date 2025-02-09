import api from './axios';
import { HeroSection, ApiResponse } from '../types/hero';

export const heroApi = {
  getAll: async (pageNumber = 1, pageSize = 10, isActive = true) => {
    const response = await api.get<ApiResponse<HeroSection>>(`/api/HeroSection/GetAll`, {
      params: { IsActive: isActive, PageNumber: pageNumber, PageSize: pageSize }
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<HeroSection>>(`/api/HeroSection/Get/${id}`);
    return response.data;
  },

  create: async (data: FormData) => {
    const response = await api.post<ApiResponse<void>>('/api/HeroSection/Create', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  update: async (data: FormData) => {
    const response = await api.put<ApiResponse<void>>('/api/HeroSection/Update', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/api/HeroSection/Delete/${id}`);
    return response.data;
  }
};