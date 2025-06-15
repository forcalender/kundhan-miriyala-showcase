
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { CSP_DIRECTIVES, generateCSPString, SECURITY_HEADERS } from '@/utils/security';

interface SecurityContextType {
  cspEnabled: boolean;
  securityHeadersEnabled: boolean;
  updateCSP: (newDirectives: Partial<typeof CSP_DIRECTIVES>) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [cspEnabled] = React.useState(true);
  const [securityHeadersEnabled] = React.useState(true);

  const updateCSP = (newDirectives: Partial<typeof CSP_DIRECTIVES>) => {
    const updatedDirectives = { ...CSP_DIRECTIVES, ...newDirectives };
    const cspString = generateCSPString(updatedDirectives);
    
    // Update CSP meta tag if it exists
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (cspMeta) {
      cspMeta.setAttribute('content', cspString);
    }
  };

  useEffect(() => {
    // Log security status for debugging
    console.log('Security Context initialized:', {
      cspEnabled,
      securityHeadersEnabled,
      cspDirectives: CSP_DIRECTIVES
    });

    // Add security event listeners
    const handleSecurityViolation = (event: SecurityPolicyViolationEvent) => {
      console.warn('CSP Violation:', {
        violatedDirective: event.violatedDirective,
        blockedURI: event.blockedURI,
        documentURI: event.documentURI,
        originalPolicy: event.originalPolicy
      });
    };

    document.addEventListener('securitypolicyviolation', handleSecurityViolation);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleSecurityViolation);
    };
  }, [cspEnabled, securityHeadersEnabled]);

  const value: SecurityContextType = {
    cspEnabled,
    securityHeadersEnabled,
    updateCSP
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
