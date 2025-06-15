
import React from "react";
import BlogFilters from "./BlogFilters";
import BlogPostsGrid from "./BlogPostsGrid";
import BlogPagination from "./BlogPagination";
import BlogBackgroundEffects from "./BlogBackgroundEffects";

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

interface BlogPostsContainerProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  posts: BlogPost[];
  isLoading: boolean;
  isVisible: boolean;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  onReadMore: (post: BlogPost) => void;
}

const BlogPostsContainer = ({
  categories,
  selectedCategory,
  onCategoryChange,
  posts,
  isLoading,
  isVisible,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  onReadMore
}: BlogPostsContainerProps) => {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative">
      <BlogBackgroundEffects />
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 font-playfair text-primary transition-all duration-700 ${
            isVisible ? 'animate-scale-in' : 'opacity-0 translate-y-10'
          }`}>
            All Blog Posts
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full transition-all duration-700 delay-200 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0 scale-x-0'
          }`} />
          <p className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 transition-all duration-700 delay-300 ${
            isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-5'
          }`}>
            Explore all our insights on technology, design, and digital experiences
          </p>
        </div>

        <BlogFilters 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          isVisible={isVisible}
        />

        <BlogPostsGrid
          posts={posts}
          isLoading={isLoading}
          isVisible={isVisible}
          onReadMore={onReadMore}
        />

        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onPageChange={onPageChange}
          isVisible={isVisible}
        />
      </div>
    </section>
  );
};

export default BlogPostsContainer;
