
import { useEffect, useState, useCallback, useRef } from "react";

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const ticking = useRef(false);

  const updateScrollY = useCallback(() => {
    setScrollY(window.scrollY);
    ticking.current = false;
  }, []);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);

      // Use requestAnimationFrame for smooth updates
      if (!ticking.current) {
        requestAnimationFrame(updateScrollY);
        ticking.current = true;
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [updateScrollY]);

  return { scrollY, isScrolling };
};

// Optimized intersection observer with better performance
export const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!element) return;

    // Create observer only once
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnect after first intersection for performance
            observerRef.current?.disconnect();
          }
        },
        { 
          threshold,
          rootMargin: '0px 0px -10% 0px' // Trigger slightly before element is fully visible
        }
      );
    }

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [element, threshold]);

  return [setElement, isVisible] as const;
};

// Batch intersection observer for multiple elements
export const useBatchIntersectionObserver = (
  elements: Element[],
  threshold = 0.1
) => {
  const [visibleElements, setVisibleElements] = useState<Set<Element>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target]));
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    elements.forEach(element => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [elements, threshold]);

  return {
    visibleElements,
    isElementVisible: useCallback((element: Element) => 
      visibleElements.has(element), [visibleElements])
  };
};
