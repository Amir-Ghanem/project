import api from './axios';
import { Project, ApiResponse } from '../types/project';

export const projectApi = {
  getAll: async (pageNumber = 1, pageSize = 10, isActive = true) => {
    const response = await api.get<ApiResponse<Project>>(`/api/Projects/GetAll`, {
      params: { IsActive: isActive, PageNumber: pageNumber, PageSize: pageSize }
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Project>>(`/api/Projects/Get?id=${id}`);
    return response.data;
  },

  create: async (data: FormData) => {
    const response = await api.post<ApiResponse<void>>('/api/Projects/Create', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  update: async (data: FormData) => {
    const response = await api.put<ApiResponse<void>>('/api/Projects/Update', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/api/Projects/Delete/${id}`);
    return response.data;
  }
};