
import { useMemo, useEffect } from "react";
import { useBlogPosts, useBlogCategories } from "./useBlogData";
import { useUrlStringState, useUrlNumberState } from "./useUrlState";
import { BlogPost } from "@/services/blogService";

interface UseEnhancedBlogFiltersProps {
  postsPerPage?: number;
}

export const useEnhancedBlogFilters = ({ 
  postsPerPage = 4
}: UseEnhancedBlogFiltersProps = {}) => {
  // URL-synchronized state
  const [selectedCategory, setSelectedCategory] = useUrlStringState('category', 'all');
  const [currentPage, setCurrentPage] = useUrlNumberState('page', 1);

  // Fetch categories from the service
  const { data: categories = [] } = useBlogCategories();

  // Fetch posts with current filters
  const { 
    data: blogData, 
    isLoading, 
    error 
  } = useBlogPosts({
    page: currentPage,
    limit: postsPerPage,
    category: selectedCategory
  });

  const paginationData = useMemo(() => {
    if (!blogData) {
      return {
        totalPages: 0,
        paginatedPosts: [] as BlogPost[],
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
        totalCount: 0
      };
    }

    return {
      totalPages: blogData.totalPages,
      paginatedPosts: blogData.posts,
      currentPage: blogData.currentPage,
      hasNextPage: blogData.currentPage < blogData.totalPages,
      hasPrevPage: blogData.currentPage > 1,
      totalCount: blogData.totalCount
    };
  }, [blogData]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset page when category changes
  useEffect(() => {
    if (selectedCategory !== 'all') {
      setCurrentPage(1);
    }
  }, [selectedCategory, setCurrentPage]);

  return {
    selectedCategory,
    categories,
    filteredPosts: paginationData.paginatedPosts,
    paginationData,
    handleCategoryChange,
    handlePageChange,
    isLoading,
    error,
    // Additional state for better UX
    hasFilters: selectedCategory !== 'all' || currentPage !== 1,
    clearFilters: () => {
      setSelectedCategory('all');
      setCurrentPage(1);
    }
  };
};
