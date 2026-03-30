import { useState, useEffect, useCallback } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>();
  private maxSize: number;
  private defaultTTL: number;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize || 100;
    this.defaultTTL = options.ttl || 5 * 60 * 1000; // 5 minutes default
  }

  set<T>(key: string, data: T, ttl?: number): void {
    // Remove oldest entry if cache is full
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    };

    this.cache.set(key, entry);
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        age: Date.now() - entry.timestamp,
        ttl: entry.ttl,
        expired: Date.now() - entry.timestamp > entry.ttl
      }))
    };
  }
}

// Persistent cache using localStorage
class PersistentCache {
  private prefix: string;
  private defaultTTL: number;

  constructor(prefix: string = 'app_cache_', options: CacheOptions = {}) {
    this.prefix = prefix;
    this.defaultTTL = options.ttl || 24 * 60 * 60 * 1000; // 24 hours default
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl: ttl || this.defaultTTL
      };

      localStorage.setItem(this.getKey(key), JSON.stringify(entry));
    } catch (error) {
      // Handle localStorage errors (e.g., quota exceeded)
      console.warn('Failed to cache data:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      
      if (!item) {
        return null;
      }

      const entry: CacheEntry<T> = JSON.parse(item);
      
      // Check if entry has expired
      if (Date.now() - entry.timestamp > entry.ttl) {
        this.delete(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.warn('Failed to retrieve cached data:', error);
      return null;
    }
  }

  delete(key: string): boolean {
    try {
      localStorage.removeItem(this.getKey(key));
      return true;
    } catch (error) {
      console.warn('Failed to delete cached data:', error);
      return false;
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  cleanup(): void {
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();

      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const item = localStorage.getItem(key);
          if (item) {
            const entry: CacheEntry<any> = JSON.parse(item);
            if (now - entry.timestamp > entry.ttl) {
              localStorage.removeItem(key);
            }
          }
        }
      });
    } catch (error) {
      console.warn('Failed to cleanup cache:', error);
    }
  }
}

// API Cache with intelligent caching strategies
class APICache {
  private memoryCache: MemoryCache;
  private persistentCache: PersistentCache;
  private defaultTTL: number;

  constructor() {
    this.memoryCache = new MemoryCache({ maxSize: 50, ttl: 5 * 60 * 1000 });
    this.persistentCache = new PersistentCache('api_cache_', { ttl: 30 * 60 * 1000 });
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes
  }

  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: {
      ttl?: number;
      usePersistent?: boolean;
      forceRefresh?: boolean;
    } = {}
  ): Promise<T> {
    const { ttl = this.defaultTTL, usePersistent = false, forceRefresh = false } = options;

    // Try to get from cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = usePersistent 
        ? this.persistentCache.get<T>(key)
        : this.memoryCache.get<T>(key);
      
      if (cached) {
        return cached;
      }
    }

    // Fetch fresh data
    try {
      const data = await fetcher();
      
      // Cache the result
      if (usePersistent) {
        this.persistentCache.set(key, data, ttl);
      } else {
        this.memoryCache.set(key, data, ttl);
      }

      return data;
    } catch (error) {
      // If network request fails, try to return stale cache
      const staleData = usePersistent 
        ? this.persistentCache.get<T>(key)
        : this.memoryCache.get<T>(key);
      
      if (staleData) {
        return staleData;
      }

      throw error;
    }
  }

  invalidate(key: string): void {
    this.memoryCache.delete(key);
    this.persistentCache.delete(key);
  }

  clear(): void {
    this.memoryCache.clear();
    this.persistentCache.clear();
  }

  cleanup(): void {
    this.memoryCache.cleanup();
    this.persistentCache.cleanup();
  }
}

// Image cache for optimized loading
class ImageCache {
  private cache = new Map<string, HTMLImageElement>();
  private loadingPromises = new Map<string, Promise<HTMLImageElement>>();

  async loadImage(src: string): Promise<HTMLImageElement> {
    // Return from cache if available
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src)!;
    }

    // Create new loading promise
    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.cache.set(src, img);
        this.loadingPromises.delete(src);
        resolve(img);
      };
      
      img.onerror = () => {
        this.loadingPromises.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });

    this.loadingPromises.set(src, promise);
    return promise;
  }

  preloadImages(sources: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(sources.map(src => this.loadImage(src)));
  }

  clear(): void {
    this.cache.clear();
    this.loadingPromises.clear();
  }
}

// React hooks for caching
export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number;
    usePersistent?: boolean;
    dependencies?: any[];
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { ttl, usePersistent, dependencies = [] } = options;

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiCache = new APICache();
        const result = await apiCache.get(key, fetcher, { ttl, usePersistent });
        
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [key, ...dependencies]);

  const refetch = useCallback(() => {
    const apiCache = new APICache();
    return apiCache.get(key, fetcher, { ttl, usePersistent, forceRefresh: true });
  }, [key, ttl, usePersistent]);

  return { data, loading, error, refetch };
}

export function useImageCache() {
  const imageCache = new ImageCache();

  const preloadImage = useCallback((src: string) => {
    return imageCache.loadImage(src);
  }, []);

  const preloadImages = useCallback((sources: string[]) => {
    return imageCache.preloadImages(sources);
  }, []);

  return { preloadImage, preloadImages };
}

// Utility functions
export const memoryCache = new MemoryCache();
export const persistentCache = new PersistentCache();
export const apiCache = new APICache();
export const imageCache = new ImageCache();

// Cleanup interval
if (typeof window !== 'undefined') {
  setInterval(() => {
    memoryCache.cleanup();
    persistentCache.cleanup();
  }, 5 * 60 * 1000); // Cleanup every 5 minutes
}
