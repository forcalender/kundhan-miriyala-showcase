
import { useState, useMemo, useEffect } from "react";
import { useBlogPosts, useBlogCategories } from "./useBlogData";
import { BlogPost } from "@/services/blogService";

interface UseBlogFiltersProps {
  postsPerPage?: number;
  initialCategory?: string;
}

export const useBlogFilters = ({ 
  postsPerPage = 4, 
  initialCategory = "all" 
}: UseBlogFiltersProps = {}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);

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
  };

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return {
    selectedCategory,
    categories,
    filteredPosts: paginationData.paginatedPosts,
    paginationData,
    handleCategoryChange,
    handlePageChange,
    isLoading,
    error
  };
};
