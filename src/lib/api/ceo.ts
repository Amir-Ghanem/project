// axios instance
import { ApiResponse, CEOSection } from '../types/ceo';
import api from './axios';

export const ceoApi = {

    getById: async ( id: string | null ) => {
        var data = {'id' : id}
        const response = await api.get<ApiResponse<CEOSection>>('/api/CEO/Get', {
          params: data, // Use `params` for query parameters
          headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
      },
  update: async (data: FormData) => {
    const response = await api.put<ApiResponse<void>>('/api/CEO/Update', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};
