import { api } from './api';
import { Brand, ApiResponse } from '../models/types';

export const brandService = {
  // Get all brands
  getAllBrands: async (): Promise<Brand[]> => {
    try {
      const response = await api.get<ApiResponse<Brand[]>>('/brands');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  },

  // Get brand by ID
  getBrandById: async (id: number): Promise<Brand> => {
    try {
      const response = await api.get<ApiResponse<Brand>>(`/brands/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching brand ${id}:`, error);
      throw error;
    }
  },
};

export default brandService;
