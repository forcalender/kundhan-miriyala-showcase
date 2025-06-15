
import { useEffect, useCallback, useState } from 'react';

interface TechnicalDebtItem {
  category: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  file?: string;
  suggestion: string;
}

interface TechnicalDebtSummary {
  totalItems: number;
  highSeverity: number;
  mediumSeverity: number;
  lowSeverity: number;
  categories: Record<string, number>;
  items: TechnicalDebtItem[];
}

export const useTechnicalDebtMonitor = () => {
  const [debtItems, setDebtItems] = useState<TechnicalDebtItem[]>([]);

  const analyzePerformance = useCallback(() => {
    const items: TechnicalDebtItem[] = [];

    // Check for performance issues
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation && navigation.loadEventEnd - navigation.fetchStart > 3000) {
        items.push({
          category: 'Performance',
          description: 'Slow page load time detected',
          severity: 'high',
          suggestion: 'Optimize bundle size, lazy load components, or improve server response time'
        });
      }

      // Check resource timing
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      resources.forEach(resource => {
        if (resource.transferSize && resource.transferSize > 500000) {
          items.push({
            category: 'Performance',
            description: `Large resource detected: ${resource.name}`,
            severity: 'medium',
            suggestion: 'Consider compressing or optimizing this resource'
          });
        }
      });
    }

    // Check for accessibility issues
    const elementsWithoutAlt = document.querySelectorAll('img:not([alt])');
    if (elementsWithoutAlt.length > 0) {
      items.push({
        category: 'Accessibility',
        description: `${elementsWithoutAlt.length} images without alt text`,
        severity: 'high',
        suggestion: 'Add descriptive alt text to all images'
      });
    }

    // Check for animation efficiency
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    if (animatedElements.length > 20) {
      items.push({
        category: 'Animation',
        description: 'High number of animated elements detected',
        severity: 'medium',
        suggestion: 'Consider reducing animations or using more efficient CSS transforms'
      });
    }

    // Check for unused CSS classes (simplified check)
    const stylesheets = Array.from(document.styleSheets);
    if (stylesheets.length > 5) {
      items.push({
        category: 'CSS',
        description: 'Multiple stylesheets loaded',
        severity: 'low',
        suggestion: 'Consider consolidating CSS files'
      });
    }

    setDebtItems(items);
  }, []);

  const getDebtSummary = useCallback((): TechnicalDebtSummary => {
    const categories: Record<string, number> = {};
    let highSeverity = 0, mediumSeverity = 0, lowSeverity = 0;

    debtItems.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
      
      switch (item.severity) {
        case 'high': highSeverity++; break;
        case 'medium': mediumSeverity++; break;
        case 'low': lowSeverity++; break;
      }
    });

    return {
      totalItems: debtItems.length,
      highSeverity,
      mediumSeverity,
      lowSeverity,
      categories,
      items: debtItems
    };
  }, [debtItems]);

  useEffect(() => {
    // Run analysis after page load
    const timer = setTimeout(analyzePerformance, 2000);
    return () => clearTimeout(timer);
  }, [analyzePerformance]);

  return {
    analyzePerformance,
    getDebtSummary,
    debtItems
  };
};
