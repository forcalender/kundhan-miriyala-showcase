
import { useEffect, useRef, useCallback, useState } from 'react';

interface AnimationConfig {
  duration?: number;
  easing?: string;
  delay?: number;
  transform?: string;
  opacity?: number;
  scale?: number;
  translateX?: number;
  translateY?: number;
}

interface AnimationState {
  isAnimating: boolean;
  hasAnimated: boolean;
}

export const useOptimizedAnimation = (
  trigger: boolean = true,
  config: AnimationConfig = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<AnimationState>({
    isAnimating: false,
    hasAnimated: false
  });

  const animate = useCallback(() => {
    const element = elementRef.current;
    if (!element || state.hasAnimated) return;

    setState(prev => ({ ...prev, isAnimating: true }));

    // Use efficient transforms instead of CSS animations
    const {
      duration = 300,
      easing = 'ease-out',
      delay = 0,
      opacity = 1,
      scale = 1,
      translateX = 0,
      translateY = 0
    } = config;

    // Set initial state
    element.style.transition = 'none';
    element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale * 0.9})`;
    element.style.opacity = '0';

    // Force reflow
    element.offsetHeight;

    setTimeout(() => {
      element.style.transition = `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`;
      element.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
      element.style.opacity = opacity.toString();

      setTimeout(() => {
        setState({ isAnimating: false, hasAnimated: true });
      }, duration);
    }, delay);
  }, [config, state.hasAnimated]);

  useEffect(() => {
    if (trigger && !state.hasAnimated) {
      animate();
    }
  }, [trigger, animate, state.hasAnimated]);

  return {
    ref: elementRef,
    isAnimating: state.isAnimating,
    hasAnimated: state.hasAnimated
  };
};

// Optimized intersection observer hook
export const useOptimizedIntersectionObserver = (
  threshold: number = 0.1,
  rootMargin: string = '0px 0px -10% 0px'
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!element) return;

    // Reuse observer instance for better performance
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              // Unobserve after first intersection for better performance
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { 
          threshold,
          rootMargin
        }
      );
    }

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [element, threshold, rootMargin]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return [setElement, isVisible] as const;
};

// Batch animation hook for multiple elements
export const useBatchAnimation = (
  elements: number,
  staggerDelay: number = 100
) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const triggerBatchAnimation = useCallback(() => {
    // Clear existing timeouts
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    // Stagger animations
    for (let i = 0; i < elements; i++) {
      const timeout = setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, i]));
      }, i * staggerDelay);
      
      timeoutsRef.current.push(timeout);
    }
  }, [elements, staggerDelay]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return {
    visibleItems,
    triggerBatchAnimation,
    isItemVisible: (index: number) => visibleItems.has(index)
  };
};
