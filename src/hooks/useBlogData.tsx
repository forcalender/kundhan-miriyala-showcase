import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { BlogService, BlogPost, BlogPostsResponse, BlogPostsParams } from '@/services/blogService';
import { useErrorHandler, handleNetworkError } from '@/hooks/useErrorHandler';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

// Query keys for React Query
export const blogQueryKeys = {
  all: ['blog'] as const,
  posts: () => [...blogQueryKeys.all, 'posts'] as const,
  post: (id: number) => [...blogQueryKeys.all, 'post', id] as const,
  featured: () => [...blogQueryKeys.all, 'featured'] as const,
  categories: () => [...blogQueryKeys.all, 'categories'] as const,
  search: (query: string) => [...blogQueryKeys.all, 'search', query] as const,
  filtered: (params: BlogPostsParams) => [...blogQueryKeys.posts(), 'filtered', params] as const,
};

// Enhanced hook for fetching blog posts with error handling
export const useBlogPosts = (params: BlogPostsParams = {}) => {
  const { handleError } = useErrorHandler();
  const { isOnline } = useNetworkStatus();
  
  return useQuery({
    queryKey: blogQueryKeys.filtered(params),
    queryFn: async () => {
      try {
        return await BlogService.getBlogPosts(params);
      } catch (error) {
        const appError = handleNetworkError(error);
        handleError(appError, 'BlogPosts fetch');
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: isOnline,
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (error && typeof error === 'object' && 'status' in error) {
        const status = (error as any).status;
        if (status >= 400 && status < 500) return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Enhanced hook for fetching a single blog post
export const useBlogPost = (id: number) => {
  const { handleError } = useErrorHandler();
  const { isOnline } = useNetworkStatus();
  
  return useQuery({
    queryKey: blogQueryKeys.post(id),
    queryFn: async () => {
      try {
        return await BlogService.getBlogPost(id);
      } catch (error) {
        const appError = handleNetworkError(error);
        handleError(appError, 'BlogPost fetch');
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!id && isOnline,
    retry: (failureCount, error) => {
      if (error && typeof error === 'object' && 'status' in error) {
        const status = (error as any).status;
        if (status === 404) return false; // Don't retry 404s
        if (status >= 400 && status < 500) return false;
      }
      return failureCount < 3;
    },
  });
};

// Enhanced hook for fetching featured posts
export const useFeaturedPosts = (limit: number = 2) => {
  const { handleError } = useErrorHandler();
  const { isOnline } = useNetworkStatus();
  
  return useQuery({
    queryKey: [...blogQueryKeys.featured(), limit],
    queryFn: async () => {
      try {
        return await BlogService.getFeaturedPosts(limit);
      } catch (error) {
        const appError = handleNetworkError(error);
        handleError(appError, 'FeaturedPosts fetch');
        throw error;
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    enabled: isOnline,
    retry: 2,
  });
};

// Enhanced hook for fetching categories
export const useBlogCategories = () => {
  const { handleError } = useErrorHandler();
  const { isOnline } = useNetworkStatus();
  
  return useQuery({
    queryKey: blogQueryKeys.categories(),
    queryFn: async () => {
      try {
        return await BlogService.getCategories();
      } catch (error) {
        const appError = handleNetworkError(error);
        handleError(appError, 'Categories fetch');
        throw error;
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    enabled: isOnline,
  });
};

// Enhanced hook for searching posts
export const useSearchPosts = (query: string) => {
  const { handleError } = useErrorHandler();
  const { isOnline } = useNetworkStatus();
  
  return useQuery({
    queryKey: blogQueryKeys.search(query),
    queryFn: async () => {
      try {
        return await BlogService.searchPosts(query);
      } catch (error) {
        const appError = handleNetworkError(error);
        handleError(appError, 'Search fetch');
        throw error;
      }
    },
    enabled: query.length > 2 && isOnline,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook for infinite scrolling (optional)
export const useInfiniteBlogPosts = (params: Omit<BlogPostsParams, 'page'> = {}) => {
  return useInfiniteQuery({
    queryKey: [...blogQueryKeys.posts(), 'infinite', params],
    queryFn: ({ pageParam = 1 }) => 
      BlogService.getBlogPosts({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages 
        ? lastPage.currentPage + 1 
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
  });
};
