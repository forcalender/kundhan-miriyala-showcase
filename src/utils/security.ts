
/**
 * Security utilities for managing CSP and other security measures
 */

export const CSP_DIRECTIVES = {
  defaultSrc: "'self'",
  scriptSrc: "'self' 'unsafe-inline' 'unsafe-eval'",
  styleSrc: "'self' 'unsafe-inline' fonts.googleapis.com",
  fontSrc: "'self' fonts.gstatic.com",
  imgSrc: "'self' data: https: blob:",
  connectSrc: "'self' ws: wss: https:",
  objectSrc: "'none'",
  baseSrc: "'self'",
  formAction: "'self'",
  frameAncestors: "'none'",
  upgradeInsecureRequests: true
} as const;

/**
 * Generate CSP string from directives
 */
export const generateCSPString = (directives: typeof CSP_DIRECTIVES): string => {
  const cspParts: string[] = [];
  
  Object.entries(directives).forEach(([key, value]) => {
    if (value === true) {
      // Handle boolean directives like upgrade-insecure-requests
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      cspParts.push(kebabKey);
    } else if (typeof value === 'string') {
      // Handle string directives
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      cspParts.push(`${kebabKey} ${value}`);
    }
  });
  
  return cspParts.join('; ') + ';';
};

/**
 * Security headers configuration
 */
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
} as const;

/**
 * Validate external resource URLs against allowlist
 */
export const isAllowedExternalResource = (url: string): boolean => {
  const allowedDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'lovable.dev'
  ];
  
  try {
    const urlObj = new URL(url);
    return allowedDomains.some(domain => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`));
  } catch {
    return false;
  }
};

/**
 * Sanitize external URLs for security
 */
export const sanitizeExternalUrl = (url: string): string | null => {
  if (!isAllowedExternalResource(url)) {
    console.warn(`Blocked potentially unsafe external resource: ${url}`);
    return null;
  }
  return url;
};
