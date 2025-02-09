import api from './axios';
import { ApiResponse, NewsItem } from '../types/news';

export const blogsApi = {
  getAll: async (pageNumber = 1, pageSize = 10, isActive = true) => {
    const response = await api.get<ApiResponse<NewsItem>>(`/api/News/GetAll`, {
      params: { IsActive: isActive, PageNumber: pageNumber, PageSize: pageSize }
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<NewsItem>>(`/api/News/Get?id=${id}`);
    return response.data;
  },

  create: async (data: FormData) => {
    const response = await api.post<ApiResponse<void>>('/api/News/Create', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  update: async (data: FormData) => {
    const response = await api.put<ApiResponse<void>>('/api/News/Update', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/api/News/Delete/${id}`);
    return response.data;
  }
};