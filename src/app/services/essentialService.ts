import { api } from './api';
import { DailyEssential, ApiResponse } from '../models/types';

export const essentialService = {
  // Get all daily essentials
  getAllEssentials: async (): Promise<DailyEssential[]> => {
    try {
      const response = await api.get<ApiResponse<DailyEssential[]>>('/essentials');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching essentials:', error);
      throw error;
    }
  },

  // Get essential by ID
  getEssentialById: async (id: number): Promise<DailyEssential> => {
    try {
      const response = await api.get<ApiResponse<DailyEssential>>(`/essentials/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching essential ${id}:`, error);
      throw error;
    }
  },
};

export default essentialService;
