
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";
import { useBlogPosts, useBlogCategories } from "@/hooks/useBlogData";
import { usePagination } from "@/hooks/usePagination";
import BlogPostsContainer from "@/components/blog/BlogPostsContainer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";

const AllBlogPosts = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch categories
  const { data: categories = [] } = useBlogCategories();
  
  // Fetch blog posts with current filters
  const { 
    data: blogData, 
    isLoading, 
    error 
  } = useBlogPosts({
    page: currentPage,
    limit: 4,
    category: selectedCategory
  });

  // Set up pagination
  const [paginationState, paginationActions] = usePagination({
    totalItems: blogData?.totalCount || 0,
    initialPage: currentPage,
    initialItemsPerPage: 4,
    onPageChange: setCurrentPage
  });

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    paginationActions.goToFirstPage();
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    paginationActions.goToPage(page);
  };

  const handleReadMore = (post: any) => {
    console.log("Read more clicked for:", post.title);
  };

  // Show error state
  if (error) {
    return (
      <ErrorBoundary componentName="All Blog Posts">
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error loading blog posts</h2>
            <p className="text-muted-foreground mb-4">Please try again later.</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary componentName="All Blog Posts">
      <div className="min-h-screen bg-background">
        {/* Header with back button */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link to="/#blog">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-2xl font-bold text-primary">All Blog Posts</h1>
          </div>
        </div>

        <div ref={setRef}>
          <BlogPostsContainer
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            posts={blogData?.posts || []}
            isLoading={isLoading}
            isVisible={isVisible}
            currentPage={paginationState.currentPage}
            totalPages={paginationState.totalPages}
            hasNextPage={paginationState.hasNextPage}
            hasPrevPage={paginationState.hasPrevPage}
            onPageChange={handlePageChange}
            onReadMore={handleReadMore}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AllBlogPosts;
