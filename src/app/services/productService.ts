import { api } from './api';
import { Product, ApiResponse, PaginatedResponse } from '../models/types';

export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>('/products');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id: number): Promise<Product> => {
    try {
      const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Get products with pagination
  getProductsPaginated: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Product>> => {
    try {
      const response = await api.get<PaginatedResponse<Product>>('/products', {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching paginated products:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>(`/products/category/${categoryId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      throw error;
    }
  },

  // Get products by brand
  getProductsByBrand: async (brandId: number): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>(`/products/brand/${brandId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching products for brand ${brandId}:`, error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const response = await api.get<ApiResponse<Product[]>>('/products/search', {
        params: { q: query }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
};

export default productService;
