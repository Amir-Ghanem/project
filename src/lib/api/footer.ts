// axios instance
import { ApiResponse, FooterSection } from '../types/footer';
import api from './axios';

export const footerApi = {
//   getAll: async (pageNumber = 1, pageSize = 10) => {
//     const response = await api.get<ApiResponse<FooterSection[]>>(`/api/FooterSection/GetAll`, {
//       params: { PageNumber: pageNumber, PageSize: pageSize }
//     });
//     return response.data;
//   },

  getById: async (id: string) => {
    const response = await api.get<ApiResponse<FooterSection>>(`/api/FooterSection/Get/${id}`);
    return response.data;
  },

//   create: async (data: FormData) => {
//     const response = await api.post<ApiResponse<void>>('/api/FooterSection/Create', data, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return response.data;
//   },

  update: async (data: FormData) => {
    const response = await api.post<ApiResponse<void>>('/api/FooterSection/Update', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

//   delete: async (id: string) => {
//     const response = await api.delete<ApiResponse<void>>(`/api/FooterSection/Delete/${id}`);
//     return response.data;
//   }
};
