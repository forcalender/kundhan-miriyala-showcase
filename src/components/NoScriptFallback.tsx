
import React from 'react';

const NoScriptFallback = () => {
  return (
    <noscript>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            JavaScript is Required
          </h1>
          
          <p className="text-lg text-gray-700 mb-6">
            This website requires JavaScript to function properly. Please enable JavaScript in your browser settings to continue.
          </p>
          
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              How to enable JavaScript:
            </h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Site Settings → JavaScript</li>
              <li><strong>Firefox:</strong> Type "about:config" → search "javascript.enabled" → set to true</li>
              <li><strong>Safari:</strong> Preferences → Security → Enable JavaScript</li>
              <li><strong>Edge:</strong> Settings → Site permissions → JavaScript</li>
            </ul>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              About Kundhan Miriyala
            </h3>
            <p className="text-gray-700">
              Full Stack Developer & Data Scientist specializing in AI-powered web applications, 
              machine learning, and modern web technologies.
            </p>
            <p className="text-gray-600 mt-2">
              Email: contact@kundhan-miriyala.com
            </p>
          </div>
        </div>
      </div>
    </noscript>
  );
};

export default NoScriptFallback;
