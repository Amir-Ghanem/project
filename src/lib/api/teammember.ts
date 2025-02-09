import { ApiResponse, TeamMember } from '../types/teammember';
import api from './axios';

export const teamApi = {
  getAll: async (pageNumber = 1, pageSize = 10, isActive = true) => {
    const response = await api.get<ApiResponse<TeamMember>>(`/api/TeamMembers/GetAll`, {
      params: { IsActive: isActive, PageNumber: pageNumber, PageSize: pageSize }
    });
    return response.data;
  },

//   getById: async (id: string) => {
//     const response = await api.get<ApiResponse<Service>>(`/api/TeamMembers/Get/${id}`);
//     return response.data;
//   },

  create: async (data: FormData) => {
    const response = await api.post<ApiResponse<void>>('/api/TeamMembers/Create', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  update: async (data: FormData) => {
    const response = await api.put<ApiResponse<void>>('/api/TeamMembers/Update', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(`/api/TeamMembers/Delete/${id}`);
    return response.data;
  }
};