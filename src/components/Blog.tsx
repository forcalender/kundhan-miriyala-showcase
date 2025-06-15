
import React, { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useScrollAnimation";
import { useFeaturedPosts, useBlogCategories } from "@/hooks/useBlogData";
import BlogHeader from "./blog/BlogHeader";
import BlogFilters from "./blog/BlogFilters";
import BlogCard from "./blog/BlogCard";
import BlogCallToAction from "./blog/BlogCallToAction";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import ErrorBoundary from "@/components/ErrorBoundary";

const Blog = () => {
  const [setRef, isVisible] = useIntersectionObserver(0.1);
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Use React Query hooks for data fetching
  const { data: featuredPosts = [], isLoading: postsLoading } = useFeaturedPosts(2);
  const { data: categories = [], isLoading: categoriesLoading } = useBlogCategories();

  // Filter featured posts by category
  const filteredPosts = featuredPosts.filter(post => {
    if (selectedCategory === "all") return true;
    return post.category === selectedCategory;
  });

  const handleReadMore = (post: typeof featuredPosts[0]) => {
    console.log("Read more clicked for:", post.title);
    // Navigation is handled in BlogCard component
  };

  const isLoading = postsLoading || categoriesLoading;

  return (
    <ErrorBoundary componentName="Blog">
      <section 
        id="blog" 
        className="py-20 px-4 max-w-6xl mx-auto relative"
        ref={setRef}
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-xl animate-bounce" />
        </div>

        <div className="relative z-10">
          <BlogHeader isVisible={isVisible} />

          <BlogFilters 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            isVisible={isVisible}
          />

          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              <LoadingSkeleton type="blog" count={2} />
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {filteredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                  isVisible={isVisible}
                  hoveredPost={hoveredPost}
                  onHover={setHoveredPost}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          )}

          <BlogCallToAction isVisible={isVisible} />
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Blog;
