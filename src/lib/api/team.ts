import { ApiResponse, TeamSectionData, UpdateTeamSectionRequest } from '../types/teamSeaction';
import api from './axios';

export const teamApi = {

    // getById: async ( id: string | null ) => {
    //     var data = {'id' : id}
    //     const response = await api.get<ApiResponse<TeamSectionData>>('/api/TeamSeactions/Get', {
    //       params: data, // Use `params` for query parameters
    //       headers: { 'Content-Type': 'application/json' },
    //     });
    //     return response.data;
    //   },

      getById: async (id: string| null) => {
        var request = id === null ? '/api/TeamSections/Get':`/api/TeamSections/Get/${id}`;
        const response = await api.get<ApiResponse<TeamSectionData>>(request);
        return response.data;
      },
    
  update: async (data: UpdateTeamSectionRequest) => {
    const response = await api.put<ApiResponse<void>>('/api/TeamSections/Update', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }
};
