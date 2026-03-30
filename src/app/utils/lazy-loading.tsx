import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '../components/ui/loading-spinner';

// Lazy loaded components for code splitting
export const LazyHeader = lazy(() => import('../components/header').then(module => ({ default: module.Header })));
export const LazyHeader2 = lazy(() => import('../components/header2').then(module => ({ default: module.Header2 })));
export const LazyHeader3 = lazy(() => import('../components/header3').then(module => ({ default: module.Header3 })));
export const LazyHeroSection = lazy(() => import('../components/HERO.SECTION/hero.section').then(module => ({ default: module.HeroSection })));
export const LazySlider2 = lazy(() => import('../components/SLIDER2/slider2').then(module => ({ default: module.Slider2 })));
export const LazyCategoriesSection = lazy(() => import('../components/slider3/slider3').then(module => ({ default: module.CategoriesSection })));
export const LazyBrandsSlider = lazy(() => import('../components/slider4/slider4').then(module => ({ default: module.BrandsSlider })));
export const LazyDailyEssentials = lazy(() => import('../components/slider5/slider5').then(module => ({ default: module.DailyEssentials })));
export const LazyFooter = lazy(() => import('../components/FOOTER/footer').then(module => ({ default: module.Footer })));

// Lazy loaded pages
export const LazyContactPage = lazy(() => import('../contact/page').then(module => ({ default: module.default })));
export const LazyAboutPage = lazy(() => import('../about/page').then(module => ({ default: module.default })));
export const LazyCartPage = lazy(() => import('../cart/page').then(module => ({ default: module.default })));
export const LazyCheckoutPage = lazy(() => import('../checkout/page').then(module => ({ default: module.default })));
export const LazySignInPage = lazy(() => import('../signin/page').then(module => ({ default: module.default })));

// Lazy loaded dashboard components
export const LazyDashboardLayout = lazy(() => import('../dashboard/layout').then(module => ({ default: module.default })));
export const LazyDashboardOverview = lazy(() => import('../dashboard/overview/page').then(module => ({ default: module.default })));
export const LazyDashboardOrders = lazy(() => import('../dashboard/orders/page').then(module => ({ default: module.default })));
export const LazyDashboardProfile = lazy(() => import('../dashboard/profile/page').then(module => ({ default: module.default })));
export const LazyDashboardSettings = lazy(() => import('../dashboard/settings/page').then(module => ({ default: module.default })));

// Wrapper component for lazy loading with fallback
export function LazyWrapper({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <Suspense fallback={fallback || <LoadingSpinner />}>
      {children}
    </Suspense>
  );
}

// Intersection Observer for lazy loading
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}

// Lazy loading component for images
interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  placeholder = '/images/placeholder.webp',
  onLoad,
  onError
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useIntersectionObserver(imgRef, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    setIsInView(true);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  return (
    <div ref={imgRef} className={className} style={{ position: 'relative' }}>
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt={alt}
          width={width}
          height={height}
          style={{ opacity: 0.5 }}
        />
      )}
      
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
            position: isLoaded ? 'static' : 'absolute',
            top: 0,
            left: 0
          }}
        />
      )}
      
      {hasError && (
        <div
          style={{
            width: width || '100%',
            height: height || '200px',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            fontSize: '14px'
          }}
        >
          Failed to load image
        </div>
      )}
    </div>
  );
}

// Dynamic import utility
export function dynamicImport<T>(
  importFunc: () => Promise<{ default: T }>,
  options: {
    loading?: React.ReactNode;
    error?: React.ReactNode;
  } = {}
) {
  const WrappedComponent = lazy(importFunc);
  
  return function DynamicComponent(props: any) {
    return (
      <Suspense fallback={options.loading || <LoadingSpinner />}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}

// Route-based code splitting
export function createLazyRoute(importFunc: () => Promise<{ default: any }>) {
  return lazy(importFunc);
}

// Preloading utility
export function preloadComponent(importFunc: () => Promise<{ default: any }>) {
  importFunc();
}

// Bundle analyzer helper
export function analyzeBundle() {
  if (process.env.NODE_ENV === 'development') {
    import('@next/bundle-analyzer').then(({ default: BundleAnalyzer }) => {
      // Bundle analyzer will be available in development
    });
  }
}

// Performance monitoring for lazy loading
export function useLazyLoadMetrics(componentName: string) {
  const startTime = useRef<number>();
  const [loadTime, setLoadTime] = useState<number>();

  useEffect(() => {
    startTime.current = performance.now();
    
    return () => {
      if (startTime.current) {
        const time = performance.now() - startTime.current;
        setLoadTime(time);
        
        // Send metrics to analytics service
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'component_load_time', {
            component_name: componentName,
            load_time: time
          });
        }
      }
    };
  }, [componentName]);

  return loadTime;
}

// Progressive loading for large datasets
export function useProgressiveLoading<T>(
  items: T[],
  batchSize: number = 20,
  initialBatch: number = 20
) {
  const [visibleItems, setVisibleItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVisibleItems(items.slice(0, initialBatch));
    setHasMore(items.length > initialBatch);
  }, [items, initialBatch]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    
    // Simulate async loading
    setTimeout(() => {
      const currentLength = visibleItems.length;
      const nextBatch = items.slice(currentLength, currentLength + batchSize);
      
      if (nextBatch.length === 0) {
        setHasMore(false);
      } else {
        setVisibleItems(prev => [...prev, ...nextBatch]);
        setHasMore(currentLength + nextBatch.length < items.length);
      }
      
      setIsLoading(false);
    }, 100);
  }, [items, visibleItems.length, batchSize, isLoading, hasMore]);

  return { visibleItems, loadMore, hasMore, isLoading };
}

// Virtual scrolling helper
export function useVirtualScrolling(
  items: any[],
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(visibleStart, visibleEnd);
  const offsetY = visibleStart * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    offsetY,
    containerRef: setContainerRef,
    handleScroll,
    totalHeight: items.length * itemHeight
  };
}
