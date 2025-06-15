
import React, { useEffect, useState } from 'react';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface PerformanceData {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
  networkStatus: 'online' | 'offline';
  connectionType?: string;
}

const PerformanceMonitor: React.FC = () => {
  const { trackCustomEvent } = usePerformanceMonitoring();
  const { isOnline, isSlowConnection } = useNetworkStatus();
  const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);

  useEffect(() => {
    // Monitor performance in development mode
    if (process.env.NODE_ENV === 'development') {
      const startTime = performance.now();
      
      const checkPerformance = () => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        
        const data: PerformanceData = {
          loadTime,
          renderTime: endTime,
          networkStatus: isOnline ? 'online' : 'offline',
          connectionType: (navigator as any).connection?.effectiveType
        };

        // Add memory usage if available
        if ('memory' in performance) {
          data.memoryUsage = (performance as any).memory.usedJSHeapSize;
        }

        setPerformanceData(data);

        // Track performance issues
        if (loadTime > 3000) {
          trackCustomEvent('slow_page_load', {
            load_time: loadTime,
            is_slow_connection: isSlowConnection
          });
        }
      };

      const timer = setTimeout(checkPerformance, 100);
      return () => clearTimeout(timer);
    }
  }, [isOnline, isSlowConnection, trackCustomEvent]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || !performanceData) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50 max-w-xs">
      <div className="mb-1 font-bold">Performance Monitor</div>
      <div>Load: {Math.round(performanceData.loadTime)}ms</div>
      <div>Network: {performanceData.networkStatus}</div>
      {performanceData.connectionType && (
        <div>Type: {performanceData.connectionType}</div>
      )}
      {performanceData.memoryUsage && (
        <div>Memory: {Math.round(performanceData.memoryUsage / 1024 / 1024)}MB</div>
      )}
      {isSlowConnection && (
        <div className="text-yellow-400">⚠ Slow Connection</div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
