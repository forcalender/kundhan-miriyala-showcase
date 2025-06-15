
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { usePerformanceMonitoring } from './usePerformanceMonitoring';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface AnalyticsConfig {
  trackingId?: string;
  enableInDevelopment?: boolean;
  cookieConsent?: boolean;
}

export const useAnalytics = (config: AnalyticsConfig = {}) => {
  const location = useLocation();
  const { trackCustomEvent } = usePerformanceMonitoring();
  const { enableInDevelopment = false, cookieConsent = true } = config;

  const isEnabled = useCallback(() => {
    if (process.env.NODE_ENV === 'development' && !enableInDevelopment) {
      return false;
    }
    return cookieConsent;
  }, [enableInDevelopment, cookieConsent]);

  const initializeGoogleAnalytics = useCallback((trackingId: string) => {
    if (!isEnabled()) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(...args: any[]) {
      window.dataLayer.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', trackingId, {
      page_title: document.title,
      page_location: window.location.href
    });

    console.log('Google Analytics initialized:', trackingId);
  }, [isEnabled]);

  const trackEvent = useCallback((eventName: string, parameters: Record<string, any> = {}) => {
    if (!isEnabled()) {
      console.log('Analytics event (disabled):', eventName, parameters);
      return;
    }

    trackCustomEvent(eventName, parameters);
  }, [isEnabled, trackCustomEvent]);

  const trackUserInteraction = useCallback((action: string, element: string, value?: number) => {
    trackEvent('user_interaction', {
      action,
      element,
      value,
      timestamp: Date.now()
    });
  }, [trackEvent]);

  const trackError = useCallback((error: Error, context?: string) => {
    trackEvent('error_occurred', {
      error_message: error.message,
      error_context: context,
      user_agent: navigator.userAgent,
      url: window.location.href
    });
  }, [trackEvent]);

  const trackTiming = useCallback((name: string, duration: number, category?: string) => {
    trackEvent('timing_complete', {
      name,
      duration,
      category,
      value: duration
    });
  }, [trackEvent]);

  useEffect(() => {
    // Initialize with environment variable or config
    const trackingId = config.trackingId || process.env.REACT_APP_GA_TRACKING_ID;
    if (trackingId) {
      initializeGoogleAnalytics(trackingId);
    }
  }, [config.trackingId, initializeGoogleAnalytics]);

  return {
    trackEvent,
    trackUserInteraction,
    trackError,
    trackTiming,
    isEnabled: isEnabled()
  };
};
