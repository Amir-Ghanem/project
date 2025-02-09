import { ApiResponse, Statistic } from '../types/Statistic';
import api from './axios';

export const statisticsApi = {
  getAll: async (pageNumber = 1, pageSize = 10, isActive = true) => {
    const response = await api.get<ApiResponse<Statistic>>(`/api/Statistics/GetAll`, {
      params: { IsActive: isActive, PageNumber: pageNumber, PageSize: pageSize }
    });
    return response.data;
  },


  create: async (data: { title: string; value: string }) => {
    const response = await api.post<ApiResponse<void>>('/api/Statistics/Create', data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },
  

  update: async (data: { id:string; title: string; value: string }) => {
    const response = await api.put<ApiResponse<void>>('/api/Statistics/Update', data, {
      headers: { 'Content-Type': 'application/json'  }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/api/Statistics/Delete/${id}`);
    return response.data;
  }
};