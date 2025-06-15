
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";
import { useEnhancedBlogFilters } from "@/hooks/useEnhancedBlogFilters";
import BlogPostsContainer from "@/components/blog/BlogPostsContainer";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";

const AllBlogPosts = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  
  // Use enhanced blog filters with URL state
  const {
    selectedCategory,
    categories,
    filteredPosts,
    paginationData,
    handleCategoryChange,
    handlePageChange,
    isLoading,
    error,
    hasFilters,
    clearFilters
  } = useEnhancedBlogFilters({ postsPerPage: 4 });

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
            
            {/* Clear filters button */}
            {hasFilters && (
              <>
                <div className="h-6 w-px bg-border" />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Clear Filters
                </Button>
              </>
            )}
          </div>
        </div>

        <div ref={setRef}>
          <BlogPostsContainer
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            posts={filteredPosts}
            isLoading={isLoading}
            isVisible={isVisible}
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            hasNextPage={paginationData.hasNextPage}
            hasPrevPage={paginationData.hasPrevPage}
            onPageChange={handlePageChange}
            onReadMore={handleReadMore}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AllBlogPosts;
