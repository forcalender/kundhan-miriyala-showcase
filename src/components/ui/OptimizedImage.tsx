
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  quality?: number;
  blur?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width = 600,
  height = 400,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  onLoad,
  onError,
  quality = 85,
  blur = true
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [imageFormat, setImageFormat] = useState<'webp' | 'original'>('webp');
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check WebP support
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const dataURL = canvas.toDataURL('image/webp');
      return dataURL.indexOf('data:image/webp') === 0;
    };

    if (!checkWebPSupport()) {
      setImageFormat('original');
    }
  }, []);

  // Enhanced Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Load image 100px before it comes into view
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generate responsive image URLs with optimized parameters
  const generateResponsiveSrcSet = (baseSrc: string, format: 'webp' | 'original' = 'webp') => {
    const breakpoints = [320, 480, 640, 768, 1024, 1280, 1440, 1920];
    const formatParam = format === 'webp' ? '&fm=webp' : '';
    
    return breakpoints
      .map(size => {
        const aspectRatio = height / width;
        const scaledHeight = Math.round(size * aspectRatio);
        return `${baseSrc}?w=${size}&h=${scaledHeight}&fit=crop&q=${quality}${formatParam} ${size}w`;
      })
      .join(', ');
  };

  // Generate blur placeholder
  const generateBlurPlaceholder = (baseSrc: string) => {
    return `${baseSrc}?w=10&h=${Math.round(10 * (height / width))}&fit=crop&blur=5&q=20`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    // Fallback to original format if WebP fails
    if (imageFormat === 'webp') {
      setImageFormat('original');
      setHasError(false);
    } else {
      setHasError(true);
      onError?.();
    }
  };

  // Generate optimized src for the main image
  const getOptimizedSrc = (baseSrc: string) => {
    const formatParam = imageFormat === 'webp' ? '&fm=webp' : '';
    return `${baseSrc}?w=${width}&h=${height}&fit=crop&q=${quality}${formatParam}`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-gray-100 dark:bg-gray-800 transition-all duration-300",
        !isLoaded && "animate-pulse",
        className
      )}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {isInView && !isLoaded && !hasError && blur && (
        <img
          src={generateBlurPlaceholder(src)}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}

      {/* Main optimized image */}
      {isInView && !hasError && (
        <picture>
          {/* WebP format for modern browsers */}
          {imageFormat === 'webp' && (
            <source
              srcSet={generateResponsiveSrcSet(src, 'webp')}
              sizes={sizes}
              type="image/webp"
            />
          )}
          
          {/* Fallback to original format */}
          <source
            srcSet={generateResponsiveSrcSet(src, 'original')}
            sizes={sizes}
          />
          
          <img
            ref={imgRef}
            src={getOptimizedSrc(src)}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "w-full h-full object-cover transition-all duration-300",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            style={{
              filter: !isLoaded && blur ? 'blur(8px)' : 'none'
            }}
          />
        </picture>
      )}
      
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
          <svg 
            className="w-8 h-8 mb-2 text-gray-400 dark:text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <span className="text-xs text-center px-2">Image unavailable</span>
        </div>
      )}

      {/* Loading indicator for priority images */}
      {priority && !isLoaded && !hasError && (
        <div className="absolute top-2 left-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
