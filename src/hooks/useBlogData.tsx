
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { BlogService, BlogPost, BlogPostsResponse, BlogPostsParams } from '@/services/blogService';

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

// Hook for fetching blog posts with pagination and filtering
export const useBlogPosts = (params: BlogPostsParams = {}) => {
  return useQuery({
    queryKey: blogQueryKeys.filtered(params),
    queryFn: () => BlogService.getBlogPosts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for fetching a single blog post
export const useBlogPost = (id: number) => {
  return useQuery({
    queryKey: blogQueryKeys.post(id),
    queryFn: () => BlogService.getBlogPost(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!id,
  });
};

// Hook for fetching featured posts
export const useFeaturedPosts = (limit: number = 2) => {
  return useQuery({
    queryKey: [...blogQueryKeys.featured(), limit],
    queryFn: () => BlogService.getFeaturedPosts(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Hook for fetching categories
export const useBlogCategories = () => {
  return useQuery({
    queryKey: blogQueryKeys.categories(),
    queryFn: () => BlogService.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook for searching posts
export const useSearchPosts = (query: string) => {
  return useQuery({
    queryKey: blogQueryKeys.search(query),
    queryFn: () => BlogService.searchPosts(query),
    enabled: query.length > 2,
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
