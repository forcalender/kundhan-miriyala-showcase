
import { useState, useEffect, useCallback } from 'react';

interface TechnicalDebtMetrics {
  bundleSize: number;
  unusedDependencies: string[];
  performanceIssues: string[];
  securityIssues: string[];
  codeComplexity: 'low' | 'medium' | 'high';
  lastAuditDate: Date;
}

interface DebtItem {
  id: string;
  type: 'performance' | 'security' | 'maintainability' | 'accessibility';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  component?: string;
  solution?: string;
  estimatedHours?: number;
}

export const useTechnicalDebtMonitor = () => {
  const [debtItems, setDebtItems] = useState<DebtItem[]>([]);
  const [metrics, setMetrics] = useState<TechnicalDebtMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeBundle = useCallback(() => {
    // Simulate bundle analysis
    const bundleSize = performance.getEntriesByType('navigation')[0]?.transferSize || 0;
    
    const issues: DebtItem[] = [];

    // Check bundle size
    if (bundleSize > 1024 * 1024) { // 1MB
      issues.push({
        id: 'large-bundle',
        type: 'performance',
        severity: 'medium',
        description: `Bundle size is ${(bundleSize / 1024 / 1024).toFixed(2)}MB, consider code splitting`,
        solution: 'Implement lazy loading and code splitting for routes and components',
        estimatedHours: 4
      });
    }

    return issues;
  }, []);

  const analyzePerformance = useCallback(() => {
    const issues: DebtItem[] = [];
    
    // Check for performance issues
    const entries = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (entries) {
      const loadTime = entries.loadEventEnd - entries.fetchStart;
      const renderTime = entries.domContentLoadedEventEnd - entries.domContentLoadedEventStart;

      if (loadTime > 3000) {
        issues.push({
          id: 'slow-load',
          type: 'performance',
          severity: 'high',
          description: `Page load time is ${Math.round(loadTime)}ms (>3s)`,
          solution: 'Optimize images, implement lazy loading, reduce bundle size',
          estimatedHours: 6
        });
      }

      if (renderTime > 100) {
        issues.push({
          id: 'slow-render',
          type: 'performance',
          severity: 'medium',
          description: `DOM render time is ${Math.round(renderTime)}ms (>100ms)`,
          solution: 'Optimize React components, use React.memo, reduce re-renders',
          estimatedHours: 3
        });
      }
    }

    return issues;
  }, []);

  const analyzeSecurity = useCallback(() => {
    const issues: DebtItem[] = [];

    // Check for common security issues
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach((script, index) => {
      const src = script.getAttribute('src');
      if (src && !src.startsWith('https://') && !src.startsWith('/')) {
        issues.push({
          id: `insecure-script-${index}`,
          type: 'security',
          severity: 'high',
          description: `Insecure script source: ${src}`,
          solution: 'Use HTTPS for all external scripts or host locally',
          estimatedHours: 1
        });
      }
    });

    // Check CSP
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!cspMeta) {
      issues.push({
        id: 'missing-csp',
        type: 'security',
        severity: 'medium',
        description: 'Missing Content Security Policy',
        solution: 'Implement comprehensive CSP headers',
        estimatedHours: 2
      });
    }

    return issues;
  }, []);

  const analyzeAccessibility = useCallback(() => {
    const issues: DebtItem[] = [];

    // Check for common accessibility issues
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        issues.push({
          id: `missing-alt-${index}`,
          type: 'accessibility',
          severity: 'medium',
          description: 'Image missing alt text',
          component: img.src ? `Image: ${img.src.split('/').pop()}` : `Image ${index + 1}`,
          solution: 'Add descriptive alt text to all images',
          estimatedHours: 0.5
        });
      }
    });

    // Check for heading structure
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) {
      issues.push({
        id: 'no-headings',
        type: 'accessibility',
        severity: 'high',
        description: 'No heading structure found',
        solution: 'Implement proper heading hierarchy',
        estimatedHours: 2
      });
    }

    return issues;
  }, []);

  const runFullAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    
    try {
      // Run all analyses
      const bundleIssues = analyzeBundle();
      const performanceIssues = analyzePerformance();
      const securityIssues = analyzeSecurity();
      const accessibilityIssues = analyzeAccessibility();

      const allIssues = [
        ...bundleIssues,
        ...performanceIssues,
        ...securityIssues,
        ...accessibilityIssues
      ];

      setDebtItems(allIssues);

      // Update metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const bundleSize = navigation?.transferSize || 0;

      setMetrics({
        bundleSize,
        unusedDependencies: [], // Would need build tool integration
        performanceIssues: performanceIssues.map(i => i.description),
        securityIssues: securityIssues.map(i => i.description),
        codeComplexity: allIssues.length > 10 ? 'high' : allIssues.length > 5 ? 'medium' : 'low',
        lastAuditDate: new Date()
      });

      console.log('Technical debt analysis complete:', {
        totalIssues: allIssues.length,
        critical: allIssues.filter(i => i.severity === 'critical').length,
        high: allIssues.filter(i => i.severity === 'high').length,
        medium: allIssues.filter(i => i.severity === 'medium').length,
        low: allIssues.filter(i => i.severity === 'low').length
      });

    } finally {
      setIsAnalyzing(false);
    }
  }, [analyzeBundle, analyzePerformance, analyzeSecurity, analyzeAccessibility]);

  useEffect(() => {
    // Run initial analysis after component mount
    const timer = setTimeout(runFullAnalysis, 2000);
    return () => clearTimeout(timer);
  }, [runFullAnalysis]);

  const getDebtSummary = useCallback(() => {
    const summary = {
      total: debtItems.length,
      critical: debtItems.filter(i => i.severity === 'critical').length,
      high: debtItems.filter(i => i.severity === 'high').length,
      medium: debtItems.filter(i => i.severity === 'medium').length,
      low: debtItems.filter(i => i.severity === 'low').length,
      estimatedHours: debtItems.reduce((total, item) => total + (item.estimatedHours || 0), 0)
    };

    return summary;
  }, [debtItems]);

  return {
    debtItems,
    metrics,
    isAnalyzing,
    runFullAnalysis,
    getDebtSummary,
    analyzeBundle,
    analyzePerformance,
    analyzeSecurity,
    analyzeAccessibility
  };
};
