import { ApiResponse, Mission } from '../types/mission';
import api from './axios';

export const missionApi = {
  getAll: async (pageNumber = 1, pageSize = 10, isActive = true) => {
    const response = await api.get<ApiResponse<Mission>>(`/api/Missions/GetAll`, {
      params: { IsActive: isActive, PageNumber: pageNumber, PageSize: pageSize }
    });
    return response.data;
  },



  create: async (data: FormData) => {
    const response = await api.post<ApiResponse<void>>('/api/Missions/Create', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  update: async (data: FormData) => {
    const response = await api.put<ApiResponse<void>>('/api/Missions/Update', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/api/Missions/Delete/${id}`);
    return response.data;
  }
};