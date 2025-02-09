import { ApiResponse, Career } from '../types/career';
import api from './axios';

export const careerApi = {
  submitApplication: async (data: FormData) => {
    const response = await api.post<ApiResponse<void>>('/api/Careers/Create', data);
    return response.data;
  },

  getAll: async (pageNumber = 1, pageSize = 10) => {
    const response = await api.get<ApiResponse<Career>>('/api/Careers/GetAll', {
      params: { PageNumber: pageNumber, PageSize: pageSize }
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Career>>(`/api/Careers/Get?id=${id}`);
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await api.put<ApiResponse<void>>(`/api/Careers/MarkAsRead/${id}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/api/Careers/Delete/${id}`);
    return response.data;
  }
};