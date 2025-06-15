
import React, { useState } from "react";
import BlogCard from "./BlogCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

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

interface BlogPostsGridProps {
  posts: BlogPost[];
  isLoading: boolean;
  isVisible: boolean;
  onReadMore: (post: BlogPost) => void;
}

const BlogPostsGrid = ({ posts, isLoading, isVisible, onReadMore }: BlogPostsGridProps) => {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-12">
        <LoadingSkeleton type="blog" count={4} />
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-12">
      {posts.map((post, index) => (
        <BlogCard
          key={post.id}
          post={post}
          index={index}
          isVisible={isVisible}
          hoveredPost={hoveredPost}
          onHover={setHoveredPost}
          onReadMore={onReadMore}
        />
      ))}
    </div>
  );
};

export default BlogPostsGrid;
