import axios from 'axios';
import { LoginRequest, LoginResponse } from '../types/auth';

const API_URL = 'http://35.180.224.195:2712';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/Login`, credentials);
    return response.data;
  }
};