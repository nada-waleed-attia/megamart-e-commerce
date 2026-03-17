import { useState, useEffect } from 'react';
import { Brand } from '../models/types';
import { brandService } from '../services/brandService';

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await brandService.getAllBrands();
        setBrands(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch brands');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};

export const useBrand = (id: number) => {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        setLoading(true);
        const data = await brandService.getBrandById(id);
        setBrand(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch brand');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBrand();
    }
  }, [id]);

  return { brand, loading, error };
};
