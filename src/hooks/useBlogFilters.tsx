
import { useState, useMemo } from "react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  gradient: string;
  tags?: string[];
  featured?: boolean;
}

interface UseBlogFiltersProps {
  posts: BlogPost[];
  postsPerPage?: number;
}

export const useBlogFilters = ({ posts, postsPerPage = 4 }: UseBlogFiltersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));
    return ["all", ...uniqueCategories];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return posts;
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
    
    return {
      totalPages,
      paginatedPosts,
      currentPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    };
  }, [filteredPosts, currentPage, postsPerPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    selectedCategory,
    categories,
    filteredPosts,
    paginationData,
    handleCategoryChange,
    handlePageChange
  };
};
