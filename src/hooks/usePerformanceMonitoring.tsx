
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface PerformanceMetrics {
  pageLoadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
  url: string;
}

export const usePerformanceMonitoring = () => {
  const location = useLocation();

  const trackCoreWebVitals = useCallback(() => {
    // Track Core Web Vitals using the web-vitals API pattern
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`Performance metric: ${entry.name}`, entry);
        
        // Send to analytics service (replace with your analytics provider)
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', entry.name, {
            value: Math.round(entry.startTime + entry.duration),
            metric_id: entry.name,
            custom_parameter: entry.entryType
          });
        }
      });
    });

    // Observe different performance entry types
    try {
      observer.observe({ entryTypes: ['navigation', 'paint', 'layout-shift', 'largest-contentful-paint'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    return () => observer.disconnect();
  }, []);

  const trackPageView = useCallback((path: string) => {
    const pageViewData = {
      page_path: path,
      page_title: document.title,
      timestamp: Date.now(),
      user_agent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      connection: (navigator as any).connection?.effectiveType || 'unknown'
    };

    console.log('Page view tracked:', pageViewData);

    // Send to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
        page_title: document.title
      });
    }
  }, []);

  const trackCustomEvent = useCallback((eventName: string, properties: Record<string, any> = {}) => {
    const eventData: AnalyticsEvent = {
      name: eventName,
      properties,
      timestamp: Date.now(),
      url: window.location.href
    };

    console.log('Custom event tracked:', eventData);

    // Send to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, properties);
    }
  }, []);

  const measurePerformance = useCallback(() => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');

      const metrics: Partial<PerformanceMetrics> = {
        pageLoadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
        firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
        timeToInteractive: navigation ? navigation.domInteractive - navigation.fetchStart : 0
      };

      console.log('Performance metrics:', metrics);
      return metrics;
    }
    return {};
  }, []);

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname);
  }, [location.pathname, trackPageView]);

  useEffect(() => {
    // Initialize Core Web Vitals tracking
    const cleanup = trackCoreWebVitals();
    
    // Measure performance on page load
    const timer = setTimeout(measurePerformance, 1000);

    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, [trackCoreWebVitals, measurePerformance]);

  return {
    trackPageView,
    trackCustomEvent,
    measurePerformance
  };
};
