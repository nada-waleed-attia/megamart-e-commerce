/**
 * Data Adapter Uti lity
 * يستخدم للتحويل بين البيانات من slides.json والبيانات من الـ API
 * مفيد في فترة الانتقال من Static Data إلى API
 */

import slidesData from '../components/DATA/slides.json';
import { Product, Category, Brand, DailyEssential } from '../models/types';

export const dataAdapter = {
  // Get data from JSON (fallback when API fails)
  getProductsFromJSON: (): Product[] => {
    return slidesData.products;
  },

  getCategoriesFromJSON: (): Category[] => {
    return slidesData.categories;
  },

  getBrandsFromJSON: (): Brand[] => {
    return slidesData.brands;
  },

  getEssentialsFromJSON: (): DailyEssential[] => {
    return slidesData.dailyEssentials;
  },

  // Find item by ID from JSON
  findProductById: (id: number): Product | undefined => {
    return slidesData.products.find(p => p.id === id);
  },

  findCategoryById: (id: number): Category | undefined => {
    return slidesData.categories.find(c => c.id === id);
  },

  findBrandById: (id: number): Brand | undefined => {
    return slidesData.brands.find(b => b.id === id);
  },

  findEssentialById: (id: number): DailyEssential | undefined => {
    return slidesData.dailyEssentials.find(e => e.id === id);
  },
};

export default dataAdapter;
